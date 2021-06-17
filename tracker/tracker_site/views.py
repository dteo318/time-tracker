from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from .models import Day, Event
import json

# Helpers
def get_day(date):
    current_day = Day.objects.filter(record_date=date)

    if len(current_day) != 0:
        return current_day[0]
    else:
        new_day = Day(record_date=date)
        new_day.save()
        return new_day

# Create your views here.
def schedule_view(request):
    return render(request, 'tracker_site/schedule.html')

def read_day_view(request):
    current_date = request.GET.get('date')
    current_day = Day.objects.filter(record_date=current_date)

    if len(current_day) != 0:
        # Day object for today exists
        day_created = "No"
        events = Event.objects.filter(task_date=current_day[0]).order_by("task_start_time")
        feeling = current_day[0].feeling
        summary = current_day[0].summary
        weather_avg_temp = current_day[0].weather_avg_temp
        weather_icon = current_day[0].weather_icon
        weather_location = current_day[0].weather_location

    else:
        # Day object is not created yet
        new_day = Day(record_date=current_date)
        new_day.save()
        day_created = "Yes"
        events = []
        feeling = None
        summary = None
        weather_avg_temp = None
        weather_icon = None
        weather_location = None

    data = {
        'is_day_created' : day_created, 
        'events' : serializers.serialize('json', events),
        'date' : current_date,
        'feeling' : feeling,
        'summary' : summary,
        'weather_avg_temp' : weather_avg_temp,
        'weather_icon' : weather_icon,
        'weather_location' : weather_location
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

def edit_event_info_view(request):
    event_pk = request.GET.get("event_pk")

    event_obj = Event.objects.get(pk=event_pk)
    event_obj.task_done = request.GET.get("event_desc")
    event_obj.task_duration = request.GET.get("event_duration")
    event_obj.task_start_time = request.GET.get("event_time")
    event_obj.task_date = get_day(request.GET.get("event_date"))

    event_obj.save(update_fields=["task_done", "task_duration", "task_start_time", "task_date"]) 

    data = {
        "event_pk" : request.GET.get("event_pk"),
        "event_date" : request.GET.get("event_date"),
        "event_time" : request.GET.get("event_time"),
        "event_duration" : request.GET.get("event_duration"),
        "event_desc" : request.GET.get("event_desc"),
    }

    return JsonResponse(data)

def delete_event_view(request):
    event_pk = request.GET.get("event_pk")
    Event.objects.filter(pk=event_pk).delete()

    data = {
        "event_pk" : event_pk,
    }

    return JsonResponse(data)

def update_day_feeling_view(request):
    update_type = request.GET.get("update_type")
    current_date = request.GET.get("date")
    if update_type == "remove-feeling":
        current_day = Day.objects.filter(record_date=current_date)[0]
        current_day.feeling = None
        current_day.save(update_fields=["feeling"]) 

        data = {
            "date" : current_date,
            "selected_feeling" : "null"
        }

        return JsonResponse(data)

    selected_feeling = request.GET.get("selected_feeling").split("-")[2]

    current_day = Day.objects.filter(record_date=current_date)[0]
    current_day.feeling = selected_feeling
    current_day.save(update_fields=["feeling"]) 

    data = {
        "date" : current_date,
        "selected_feeling" : selected_feeling
    }

    return JsonResponse(data)

def update_day_summary_view(request):
    current_date = request.GET.get("date")
    day_summary = request.GET.get("summary")

    current_day = Day.objects.filter(record_date=current_date)[0]
    current_day.summary = day_summary
    current_day.save(update_fields=["summary"]) 

    data = {
        "date" : current_date,
        "summary" : day_summary
    }
    return JsonResponse(data)

def update_weather(request):
    current_date = request.GET.get('date')
    current_day = Day.objects.filter(record_date=current_date)[0]

    weather_avg_temp = request.GET.get("weather_avg_temp")
    weather_icon = request.GET.get("weather_icon")
    weather_location = request.GET.get("weather_location")

    current_day.weather_avg_temp = weather_avg_temp
    current_day.weather_icon = weather_icon
    current_day.weather_location = weather_location

    current_day.save(update_fields=["weather_avg_temp", "weather_icon", "weather_location"])

    data = {
        "date" : current_date,
        "weather_avg_temp" : weather_avg_temp,
        "weather_icon" : weather_icon,
        "weather_location" : weather_location
    }

    return JsonResponse(data)

def get_event_info_view(request):
    event_pk = request.GET.get("event_pk")

    event_obj = Event.objects.get(pk=event_pk)

    data = {
        "date" : event_obj.task_date.record_date,
        "time" : event_obj.task_start_time,
        "duration" : event_obj.task_duration,
        "desc" : event_obj.task_done
    }

    return JsonResponse(data)