from django.urls import reverse_lazy
from django.db import transaction

from rest_framework.throttling import AnonRateThrottle
from rest_framework import generics

from .services import emails
from . import serializers
from .serializers import utils


class CustomerContactsSaveApiView(generics.CreateAPIView):
    http_method_names = ["post", "options", "head"]
    success_url = reverse_lazy("home")
    serializer_class = serializers.CustomerOrderSerializer
    throttle_classes = [AnonRateThrottle]

    def get_serializer(self, *args, **kwargs):
        kwargs.update(data=utils.customer_data_to_customer_order(
            data=kwargs.get("data")
        ))

        return super().get_serializer(*args, **kwargs)

    @transaction.atomic
    def perform_create(self, serializer: serializers.CustomerOrderSerializer):
        super().perform_create(serializer=serializer)
        emails.on_submit_order(
            target_email=serializer.validated_data["customer"]["email"]
        )
