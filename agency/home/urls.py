from django.contrib import admin
from django.urls import path

from .views import HomeView
from . import config

urlpatterns = [
    path('', HomeView.as_view(), name="home"),
    path(f'<str:{config.LANG_CODE_URL_ARG_NAME}>/', HomeView.as_view(), name="home-multilang"),
]
