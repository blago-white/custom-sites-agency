from django.shortcuts import render
from django.views.generic import TemplateView

from .filters import *


class HomeView(TemplateView):
    template_name = "main.html"
