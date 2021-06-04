# Generated by Django 3.2.3 on 2021-06-04 02:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Day',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('record_date', models.DateField(auto_now_add=True)),
                ('feeling', models.CharField(choices=[(':D', 'Amazing'), (':)', 'Happy'), (':|', 'Okay'), (':/', 'Down'), (':(', 'Terrible')], default=':|', max_length=2)),
                ('summary', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_done', models.CharField(max_length=200)),
                ('task_start_time', models.TimeField(auto_now_add=True)),
                ('task_duration', models.IntegerField()),
                ('task_date', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tracker_site.day')),
            ],
        ),
    ]
