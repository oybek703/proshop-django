# Generated by Django 4.0 on 2022-01-20 14:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0034_product_average_rate'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='average_rate',
        ),
    ]
