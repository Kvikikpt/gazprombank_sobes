from abc import ABC

from rest_framework import serializers


class UploadSerializer(serializers.Serializer):
    file = serializers.FileField(help_text='Выберите файл')


class BalanceViewSerializer(serializers.Serializer):
    date = serializers.CharField(help_text='Выберите дату')

class GraphViewSerializer(serializers.Serializer):
    startDate = serializers.CharField(help_text='Выберите дату начала')
    endDate = serializers.CharField(help_text='Выберите дату конца')
