from django.urls import path
from users.api import api

urlpatterns = [
    path('camplight/api/', api.urls),
]
