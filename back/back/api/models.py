from django.db import models


class MainTable(models.Model):
    id = models.IntegerField(default=0, primary_key=True)
    Organi = models.CharField(max_length=200)
    Account = models.CharField(max_length=200)
    Curr = models.CharField(max_length=200)
    date = models.DateTimeField('date published')
    Counterparty = models.CharField(max_length=200)
    Agreement = models.CharField(max_length=200)
    Balance = models.IntegerField(default=0)
    Inflow = models.IntegerField(default=0)
    Outflow = models.IntegerField(default=0)
    week = models.IntegerField(default=0)
    month = models.CharField(max_length=200)
    year = models.IntegerField(default=0)
