from .serializers import CustomerOrderSerializer

__all__ = ("customer_data_to_customer_order",
           "is_customer_order_serializer_data")

_CUSTOMER_SERIALIZER_EMAIL_FIELD_NAME = CustomerOrderSerializer.Meta.fields[0]
_CUSTOMER_SERIALIZER_FIELD_NAME = CustomerOrderSerializer.Meta.fields[0]


def customer_data_to_customer_order(data: dict) -> dict:
    try:
        return {_CUSTOMER_SERIALIZER_FIELD_NAME: {
            "email": dict(data).get("email")[0]
        }}
    except:
        return {_CUSTOMER_SERIALIZER_FIELD_NAME: {"email": None}}


def is_customer_order_serializer_data(data: dict) -> bool:
    try:
        if type(customer_data := data[_CUSTOMER_SERIALIZER_FIELD_NAME]) is dict:
            return _CUSTOMER_SERIALIZER_EMAIL_FIELD_NAME in customer_data.keys()

    except KeyError:
        return False
