from django.db import models
from . import utils


class Customer(models.Model):
    customer_id = models.BigAutoField(primary_key=True)
    email = models.EmailField(verbose_name="Contact mail", unique=True)
    verified = models.BooleanField(verbose_name="Customer email verified?",
                                   blank=True,
                                   default=False)

    def __str__(self):
        return f"Customer {self.email})"

    class Meta:
        verbose_name = "Customer"
        verbose_name_plural = "Customers"


class CustomerOrder(models.Model):
    class OrderTariffs(models.TextChoices):
        LANDING = "1", "Landing"
        COMMERCE = "2", "E-Commerce site"
        CUSTOM = "3", "Custom"

    customer = models.OneToOneField(to=Customer,
                                    on_delete=models.CASCADE,
                                    primary_key=True)
    tariff = models.CharField(max_length=1,
                              choices=OrderTariffs.choices,
                              blank=False,
                              default=OrderTariffs.CUSTOM)
    date = models.DateTimeField(verbose_name="Order date", auto_now=True)

    def __str__(self):
        return f"Order for {self.customer} ({self.date})"

    class Meta:
        db_table = "customers_customers_orders"
        verbose_name = "Customer Order Request"
        verbose_name_plural = "Customers Orders"


class EmailVerificationCode(models.Model):
    customer = models.OneToOneField(to=Customer,
                                    on_delete=models.CASCADE,
                                    primary_key=True)
    code = models.PositiveSmallIntegerField(
        verbose_name="Unique code for customer",
        default=utils.generate_random_email_code,
        blank=True
    )
    date = models.DateTimeField(verbose_name="Code generation date",
                                auto_now=True)

    def __str__(self):
        return f"Code {code}"

    class Meta:
        db_table = "customers_email_verification_codes"
        verbose_name = "Verification Code"
        verbose_name_plural = "Verification Codes"
