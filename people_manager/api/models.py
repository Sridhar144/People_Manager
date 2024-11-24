from django.db import models

# Create your models here.
from djongo import models

class Person(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    mobile_number = models.CharField(max_length=15)

    def __str__(self):
        return self.name
