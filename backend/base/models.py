from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=64)
    brand = models.CharField(max_length=64, null=True)
    category = models.CharField(max_length=64, null=True)
    description = models.TextField(max_length=256, blank=True, null=True)
    rating = models.DecimalField(max_digits=4, decimal_places=3, null=True, blank=True)
    num_reviews = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=7, decimal_places=3)
    count_in_stock = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
