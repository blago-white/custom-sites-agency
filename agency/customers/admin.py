import datetime

from django.contrib import admin
from .models.models import Customer, CustomerOrder, EmailVerificationCode


@admin.register(CustomerOrder)
class CustomerOrderAdmin(admin.ModelAdmin):
    list_display = ["customer", "tariff", "date", "up_this_week"]
    ordering = ["-date"]

    @admin.display(boolean=True)
    def up_this_week(self, order: CustomerOrder):
        delta_time = datetime.datetime.now(datetime.timezone.utc) - order.date
        return delta_time < datetime.timedelta(days=7)


admin.site.register(Customer)
admin.site.register(EmailVerificationCode)
