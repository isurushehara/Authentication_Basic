from django.urls import path
from .views import register, login, dashboard

urlpatterns = [
    path("register/", register),
    path("login/", login),
    path("dashboard/", dashboard),
]
