# Generated by Django 4.0 on 2022-01-19 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0023_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(default='/static/placeholder.png', null=True, upload_to='images/'),
        ),
    ]
