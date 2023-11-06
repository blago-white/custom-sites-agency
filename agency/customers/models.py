from django.db import models


class CustomerOrder(models.Model):
    email = models.EmailField(verbose_name="Contact mail", primary_key=True)
    date = models.DateTimeField(verbose_name="Order date", auto_now=True)

    def __str__(self):
        return f"Order for {self.email} ({self.date})"

    class Meta:
        db_table = "customers_customers_orders"
        verbose_name = "Customer Order Request"
        verbose_name_plural = "Customers Orders"
