from django.db import models
import time

# Create your models here.
class Day(models.Model):
    FEELING_CHOICES = [
        (":D", "Amazing"),
        (":)", "Happy"),
        (":|", "Okay"),
        (":/", "Down"),
        (":(", "Terrible")
    ]

    record_date = models.DateField()
    feeling = models.CharField(max_length=2, choices=FEELING_CHOICES, null=True)
    summary = models.TextField(default="No summary entered for today...")

class Event(models.Model):
    task_done = models.CharField(max_length=200)
    task_date = models.ForeignKey(Day, on_delete=models.CASCADE)
    task_start_time = models.TimeField()
    task_duration = models.IntegerField()

    def __str__(self):
        return self.task_done

