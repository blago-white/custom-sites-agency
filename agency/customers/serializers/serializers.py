from django.db import transaction, utils

from rest_framework.exceptions import ValidationError
from rest_framework.serializers import (ModelSerializer, EmailField,
                                        ChoiceField, IPAddressField)

from ..models.models import CustomerOrder, Customer
from . import exceptions


__all__ = ["CustomerOrderSerializer", "CustomerSerializer"]


class CustomerSerializer(ModelSerializer):
    ip = IPAddressField(protocol="IPv4")
    email = EmailField()

    class Meta:
        fields = ["ip", "email"]
        model = Customer


class CustomerOrderSerializer(ModelSerializer):
    customer = CustomerSerializer()
    tariff = ChoiceField(choices=CustomerOrder.OrderTariffs.choices)

    class Meta:
        fields = ["customer", "tariff"]
        model = CustomerOrder

    @transaction.atomic
    def create(self, validated_data):
        customer = CustomerSerializer(data=validated_data.pop('customer'))

        if customer.is_valid(raise_exception=True):
            try:
                customer = customer.save()
            except utils.IntegrityError:
                raise exceptions.raise_customer_email_exception(
                    "This email is already used, contact us if this is a error"
                )

        customer_order = CustomerOrder(customer=customer,
                                       tariff=validated_data.pop('tariff'))
        customer_order.full_clean()
        customer_order.save()

        return customer_order
