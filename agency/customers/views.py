from django.urls import reverse_lazy

from rest_framework import generics

from . import serializers, throttle, utils


class CustomerContactsSaveApiView(generics.CreateAPIView):
    http_method_names = ["post", "options", "head"]
    success_url = reverse_lazy("home")
    serializer_class = serializers.CustomerOrderSerializer
    throttle_classes = (throttle.CustomerContactsSendThrottle,)

    def get_serializer(self, *args, **kwargs):
        kwargs.update(data=utils.customer_data_to_customer_order(
            data=kwargs.get("data")
        ))

        return super().get_serializer(*args, **kwargs)
