from django.views.generic import TemplateView, FormView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http.response import HttpResponse, HttpResponseBadRequest
from django.urls import reverse_lazy
from django import forms

from customers.forms import CustomerContactForm
from .filters import *


class HomeView(FormView):
    template_name = "main.html"
    success_url = reverse_lazy("home")
    form_class = CustomerContactForm

    @method_decorator(decorator=csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(*args, request=request, **kwargs)

    def form_valid(self, form: forms.ModelForm):
        form.save()

        return HttpResponse()

    def form_invalid(self, form: forms.ModelForm):
        return HttpResponseBadRequest(content="Email already occupied!")
