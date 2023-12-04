from django.urls import reverse_lazy
from django.db import transaction

from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from rest_framework import generics

from .services import emails, ip
from . import serializers
from .serializers import utils


class CustomerContactsSaveApiView(generics.CreateAPIView):
    http_method_names = ["post", "options", "head", "trace"]
    success_url = reverse_lazy("home")
    serializer_class = serializers.CustomerOrderSerializer
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

    def get_serializer(self, *args, **kwargs):
        self._process_client_data(kwargs)

        return super().get_serializer(*args, **kwargs)

    @transaction.atomic
    def perform_create(self, serializer: serializers.CustomerOrderSerializer):
        super().perform_create(serializer=serializer)
        emails.on_submit_order(
            target_email=serializer.validated_data["customer"]["email"]
        )

    def _process_client_data(self, serializer_kwargs: dict) -> None:
        request_data = utils.add_ip_to_customer_data(
            raw_data=serializer_kwargs.get("data"),
            ip=ip.get_ip_from_request(request=self.request)
        )

        serializer_kwargs.update(data=utils.customer_data_to_customer_order(
            data=request_data
        ))
