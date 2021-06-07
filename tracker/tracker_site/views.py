from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from .models import Day, Event
import json

# Create your views here.
def schedule_view(request):
    return render(request, 'tracker_site/schedule.html')

def read_day_view(request):
    current_date = request.GET.get('date')
    current_day = Day.objects.filter(record_date=current_date)

    if len(current_day) != 0:
        # Day object for today exists
        day_created = "No"
        events = Event.objects.filter(task_date=current_day[0])
    else:
        # Day object is not created yet
        new_day = Day(record_date=current_date, feeling=":D", summary="This is a test!")
        new_day.save()
        day_created = "Yes"
        events = []

    data = {
        'is_day_created' : day_created, 
        'events' : serializers.serialize('json', events),
        'date' : current_date,
    }

    return JsonResponse(data)

def create_event_view(request):
    # Will need to retrieve Day object to use as foreign key
    selected_event_date = request.GET.get("selected_event_date")
    selected_event_time = request.GET.get("selected_event_time")
    selected_event_duration = request.GET.get("selected_event_duration")
    selected_event_desc = request.GET.get("selected_event_desc")

    task_day = Day.objects.filter(record_date=selected_event_date)[0]

    new_event = Event(task_done=selected_event_desc, task_start_time=selected_event_time, task_duration=selected_event_duration, task_date=task_day)
    new_event.save()

    data = {
        "result" : "Event created successfully",
    }

    return JsonResponse(data)

def delete_event_view(request):
    pass

