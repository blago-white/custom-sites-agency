from django.contrib import admin
from django.urls import path

from .views import CustomerContactsSaveApiView

urlpatterns = [
    path('order/', CustomerContactsSaveApiView.as_view(), name="customer_contacts_form"),
]
