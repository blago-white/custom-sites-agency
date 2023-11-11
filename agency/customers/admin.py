from django.contrib import admin
from .models.models import Customer, CustomerOrder, EmailVerificationCode

admin.site.register(Customer)
admin.site.register(CustomerOrder)
admin.site.register(EmailVerificationCode)
