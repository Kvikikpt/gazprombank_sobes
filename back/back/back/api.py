import csv
import io
from datetime import datetime

from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.reverse import reverse

from django.db import connection

from .serializers import UploadSerializer, BalanceViewSerializer, GraphViewSerializer
from api.models import MainTable


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'Upload': reverse('upload', request=request, format=format),
        'Dates': reverse('dates', request=request, format=format),
        'Balance': reverse('balance', request=request, format=format),
        'Income': reverse('income', request=request, format=format),
    })


class UploadView(APIView):
    permission_classes = ()
    authentication_classes = ()
    serializer_class = UploadSerializer

    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'data': 'Posted data is invalid'})
        serializer = self.serializer_class(data=self.request.data)
        print(request.data)
        if not serializer.is_valid():
            return response
        request_data = serializer.validated_data
        file = request_data['file'].file
        stream = io.StringIO(file.read().decode("UTF8"), newline=None)
        csv_input = csv.reader(stream)

        MainTable.objects.all().delete()
        index = 0
        for row in csv_input:
            if index != 0:
                date = datetime.strptime(row[4], '%d.%m.%Y')
                row = MainTable(
                    id=row[0],
                    Organi=row[1],
                    Account=row[2],
                    Curr=row[3],
                    date=date,
                    Counterparty=row[5],
                    Agreement=row[6],
                    Balance=row[7],
                    Inflow=row[8],
                    Outflow=row[9],
                    week=row[10],
                    month=row[11],
                    year=row[12]
                )
                row.save()
            index += 1

        try:
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(f'Error occurred. Error: {e}')
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'Error': 'An error occurred'})


class BalanceView(APIView):
    permission_classes = ()
    authentication_classes = ()
    serializer_class = BalanceViewSerializer

    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'data': 'Posted data is invalid'})
        serializer = self.serializer_class(data=self.request.data)
        if not serializer.is_valid():
            return response
        request_data = serializer.validated_data
        date = datetime.strptime(request_data['date'], '%Y.%m.%d')

        rows = MainTable.objects.filter(date=date)

        balance_left = {
            'ЭТП_ГПБ': {'RUB': 0, 'EUR': 0, 'USD': 0},
            'Консалтинг_ГПБ': {'RUB': 0, 'EUR': 0, 'USD': 0},
            'Юр лицо': {'RUB': 0, 'EUR': 0, 'USD': 0}
        }
        for row in rows:
            if row.Organi not in balance_left:
                balance_left[row.Organi] = {
                    'RUB': 0,
                    'EUR': 0,
                    'USD': 0
                }
            balance_left[row.Organi][row.Curr] += row.Balance

        try:
            return Response(status=status.HTTP_200_OK, data={'balance_left': balance_left})
        except Exception as e:
            print(f'Error occurred. Error: {e}')
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'Error': 'An error occurred'})


class IncomeGraphView(APIView):
    permission_classes = ()
    authentication_classes = ()
    serializer_class = GraphViewSerializer

    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'data': 'Posted data is invalid'})
        serializer = self.serializer_class(data=self.request.data)
        if not serializer.is_valid():
            return response
        request_data = serializer.validated_data
        startDate = datetime.strptime(request_data['startDate'], '%Y.%m.%d')
        endDate = datetime.strptime(request_data['endDate'], '%Y.%m.%d')

        graphs = {
            'ЭТП_ГПБ': {'RUB': {}, 'EUR': {}, 'USD': {}},
            'Консалтинг_ГПБ': {'RUB': {}, 'EUR': {}, 'USD': {}},
            'Юр лицо': {'RUB': {}, 'EUR': {}, 'USD': {}}
        }

        rows = MainTable.objects.filter(date__lte=endDate, date__gte=startDate)
        for row in rows:
            date = row.date.strftime("%Y.%m.%d")
            if date not in graphs[row.Organi][row.Curr]:
                graphs[row.Organi][row.Curr][date] = row.Inflow
            else:
                graphs[row.Organi][row.Curr][date] += row.Inflow

        for namespace in graphs:
            for valute in graphs[namespace]:
                array = []
                for date in graphs[namespace][valute]:
                    array.append({'name': date, 'value': graphs[namespace][valute][date]})
                graphs[namespace][valute] = array

        try:
            return Response(status=status.HTTP_200_OK, data={'income': graphs})
        except Exception as e:
            print(f'Error occurred. Error: {e}')
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'Error': 'An error occurred'})

class DatesView(APIView):
    permission_classes = ()
    authentication_classes = ()

    def get(self, request, *args, **kwargs):
        try:
            with connection.cursor() as cursor:
                dates = cursor.execute("select distinct date from api_maintable").fetchall()
                dates = list(map(lambda sett: sett[0].strftime("%Y.%m.%d"), dates))
            return Response(status=status.HTTP_200_OK, data={'dates': dates})
        except Exception as e:
            print(f'Error occurred. Error: {e}')
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'Error': 'An error occurred'})
