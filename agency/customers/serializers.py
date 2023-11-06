from django.db import transaction, utils

from rest_framework.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer, EmailField

from .models.models import CustomerOrder, Customer


class CustomerSerializer(ModelSerializer):
    email = EmailField()

    class Meta:
        fields = ["email"]
        model = Customer


class CustomerOrderSerializer(ModelSerializer):
    customer = CustomerSerializer()

    class Meta:
        fields = ["customer"]
        model = CustomerOrder

    @transaction.atomic
    def create(self, validated_data):
        customer = CustomerSerializer(data=validated_data.pop('customer'))
        if customer.is_valid(raise_exception=True):
            try:
                customer = customer.save()
            except utils.IntegrityError:
                raise ValidationError(
                    {"customer": {"email": ["This email already used!"]}}
                )

        customer_order = CustomerOrder(customer=customer)
        customer_order.full_clean()
        customer_order.save()

        return customer_order
