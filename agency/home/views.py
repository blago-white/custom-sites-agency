from django.views.generic import TemplateView

from .filters import *
from . import mixins


class HomeView(mixins.MultilangHomeViewMixin, TemplateView):
    template_name = "main.html"
