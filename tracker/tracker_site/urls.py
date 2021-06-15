from django.urls import path
from .views import *

urlpatterns = [
    path('', schedule_view, name='schedule_view'),
    path('ajax/read_day_events', read_day_view, name='read_day_view'),
    path('ajax/add_event', create_event_view, name='create_event_view'),
    path('ajax/delete_event', delete_event_view, name="delete_event_view"),
    path('ajax/update_day_feeling', update_day_feeling_view, name="update_day_feeling_view"),
    path('ajax/update_day_summary', update_day_summary_view, name="update_day_summary_view"),
    path('ajax/get_event_info', get_event_info_view, name="get_event_info_view"),
    path('ajax/edit_event_info', edit_event_info_view, name="edit_event_info_view"),
    path('ajax/update_weather', update_weather, name="update_weather"),
]