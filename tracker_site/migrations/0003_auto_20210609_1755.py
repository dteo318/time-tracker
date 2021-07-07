# Generated by Django 3.2.3 on 2021-06-09 23:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker_site', '0002_auto_20210606_2146'),
    ]

    operations = [
        migrations.AlterField(
            model_name='day',
            name='feeling',
            field=models.CharField(choices=[(':D', 'Amazing'), (':)', 'Happy'), (':|', 'Okay'), (':/', 'Down'), (':(', 'Terrible')], max_length=2, null=True),
        ),
        migrations.AlterField(
            model_name='day',
            name='summary',
            field=models.TextField(default='No summary entered for today...'),
        ),
    ]