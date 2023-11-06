from django import forms

from .models import CustomerOrder


class CustomerContactForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = CustomerOrder
        fields = ["email"]
