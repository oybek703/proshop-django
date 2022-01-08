from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=64)
    image = models.ImageField(null=True, upload_to='images/')
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


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    rating = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    comment = models.TextField(max_length=256, blank=True, null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=32)
    tax_price = models.DecimalField(max_digits=7, decimal_places=3)
    shipping_price = models.DecimalField(max_digits=7, decimal_places=3)
    total_price = models.DecimalField(max_digits=7, decimal_places=3)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.user.first_name


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=64)
    qty = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=7, decimal_places=3, blank=True, null=True)
    image = models.CharField(max_length=256, null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Order Items'


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    address = models.CharField(max_length=128)
    city = models.CharField(max_length=128)
    postal_code = models.CharField(max_length=128)
    country = models.CharField(max_length=128)
    shipping_price = models.DecimalField(max_digits=7, decimal_places=3)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.address

    class Meta:
        verbose_name_plural = 'Shipping Addresses'
