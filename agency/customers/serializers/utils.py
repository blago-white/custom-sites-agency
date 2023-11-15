from django.http import QueryDict

from customers.serializers import CustomerOrderSerializer

__all__ = ("customer_data_to_customer_order",
           "is_customer_order_serializer_data")

_CUSTOMER_SERIALIZER_EMAIL_FIELD_NAME = CustomerOrderSerializer.Meta.fields[0]
_CUSTOMER_SERIALIZER_FIELD_NAME = CustomerOrderSerializer.Meta.fields[0]


def add_ip_to_customer_data(raw_data: QueryDict | dict, ip: str) -> dict:
    raw_data = dict(raw_data)

    raw_data.update(ip=[ip])

    return raw_data


def customer_data_to_customer_order(data: dict) -> dict:
    try:
        return {_CUSTOMER_SERIALIZER_FIELD_NAME: {
                    "email": dict(data).get("email")[0],
                    "ip": dict(data).get("ip")[0]
                }, "tariff": dict(data).get("tariff")[0]}
    except:
        return {_CUSTOMER_SERIALIZER_FIELD_NAME: {"email": None}}


def is_customer_order_serializer_data(data: dict) -> bool:
    try:
        if type(customer_data := data[_CUSTOMER_SERIALIZER_FIELD_NAME]) is dict:
            return _CUSTOMER_SERIALIZER_EMAIL_FIELD_NAME in customer_data.keys()

    except KeyError:
        return False
