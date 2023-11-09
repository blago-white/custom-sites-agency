from rest_framework.exceptions import ValidationError


def raise_customer_email_exception(detail: str):
    raise ValidationError(
        {"customer": {"email": [detail]}}
    )
