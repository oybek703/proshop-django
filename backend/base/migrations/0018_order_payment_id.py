# Generated by Django 4.0 on 2022-01-14 11:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0017_alter_orderitem_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='payment_id',
            field=models.CharField(max_length=32, null=True),
        ),
    ]