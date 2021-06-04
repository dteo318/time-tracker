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

    record_date = models.DateField(auto_now_add=True)
    feeling = models.CharField(max_length=2, choices=FEELING_CHOICES, default=":|")
    summary = models.TextField()

    def __str__(self):
        return self.record_date

class Event(models.Model):
    task_done = models.CharField(max_length=200)
    task_date = models.ForeignKey(Day, on_delete=models.CASCADE)
    task_start_time = models.TimeField(auto_now_add=True)
    task_duration = models.IntegerField()

    def __str__(self):
        return self.task_done

