from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def schedule_view(request):
    return render(request, 'tracker_site/schedule.html')
