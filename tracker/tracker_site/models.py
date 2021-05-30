from django.db import models
import time

# Create your models here.
class Event(models.Model):
    FEELING_CHOICES = [
        (":D", "Amazing"),
        (":)", "Happy"),
        (":|", "Okay"),
        (":/", "Down"),
        (":(", "Terrible")
    ]

    task_done = models.CharField(max_length=200)
    task_date = models.DateField(auto_now_add=True)
    task_time = models.TimeField(default=time.localtime())
    current_feeling = models.CharField(max_length=2, choices=FEELING_CHOICES, default=":|")

    def __str__(self):
        return self.date

