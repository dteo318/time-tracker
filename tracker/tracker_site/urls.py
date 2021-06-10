from django.urls import path
from .views import schedule_view, read_day_view, create_event_view, update_day_feeling_view

urlpatterns = [
    path('', schedule_view, name='schedule_view'),
    path('ajax/read_day_events', read_day_view, name='read_day_view'),
    path('ajax/add_event', create_event_view, name='create_event_view'),
    path('ajax/update_day_feeling', update_day_feeling_view, name="update_day_feeling_view")
]