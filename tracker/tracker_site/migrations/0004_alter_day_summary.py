# Generated by Django 3.2.3 on 2021-06-11 02:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker_site', '0003_auto_20210609_1755'),
    ]

    operations = [
        migrations.AlterField(
            model_name='day',
            name='summary',
            field=models.TextField(null=True),
        ),
    ]
