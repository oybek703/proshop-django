# Generated by Django 4.0 on 2022-01-09 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_remove_cartitem_user_cart_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='user',
        ),
        migrations.AddField(
            model_name='cart',
            name='cart_id',
            field=models.CharField(max_length=128, null=True),
        ),
    ]