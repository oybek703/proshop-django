# Generated by Django 4.0 on 2022-01-20 09:54

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0030_remove_review_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='name',
            field=models.CharField(default=django.utils.timezone.now, max_length=128),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='review',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.product'),
        ),
    ]
