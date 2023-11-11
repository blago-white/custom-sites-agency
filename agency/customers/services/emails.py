from django.core import mail
from django.conf import settings

from rest_framework.exceptions import ValidationError

from ..serializers.exceptions import raise_customer_email_exception


__all__ = ["on_submit_order"]
_ADMIN_MAIL = "example@example.com"


def on_submit_order(target_email: str) -> None:
    try:
        _send_customer_notification(customer_email=target_email)
        _send_admin_notification(customer_email=target_email)
    except:
        raise raise_customer_email_exception(
            "Some error with mail sending error occured"
        )


def _send_customer_notification(customer_email: str) -> None:
    mail.send_mail(subject="Site consultation",
                   message="Thank's for order!",
                   from_email=settings.DEFAULT_FROM_EMAIL,
                   recipient_list=(customer_email, ))


def _send_admin_notification(customer_email: str) -> None:
    mail.send_mail(subject="Customer order",
                   message=f"Customer {customer_email} "
                           f"order the consultation about site",
                   from_email=settings.DEFAULT_FROM_EMAIL,
                   recipient_list=(_ADMIN_MAIL, ))
