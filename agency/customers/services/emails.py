from django.core import mail
from django.conf import settings

from rest_framework.exceptions import ValidationError

from . import _messages, _subjects
from ..serializers.exceptions import raise_customer_email_exception


__all__ = ["on_submit_order"]


def on_submit_order(target_email: str) -> None:
    try:
        _send_customer_notification(customer_email=target_email)
        _send_admin_notification(customer_email=target_email)
    except:
        raise raise_customer_email_exception(
            _messages.ERROR_MAIL_SEND
        )


def _send_customer_notification(customer_email: str) -> None:
    mail.send_mail(subject=_subjects.CustomerSiteOrderSubject,
                   html_message=_messages.ORDER_THANKS,
                   message="",
                   from_email=settings.DEFAULT_FROM_EMAIL,
                   recipient_list=(customer_email, ))


def _send_admin_notification(customer_email: str) -> None:
    mail.send_mail(subject=_subjects.AdminSiteOrderSubject,
                   html_message=_messages.ADMIN_ORDER_NOTIFICATION.format(
                       email=customer_email
                   ),
                   message="",
                   from_email=settings.DEFAULT_FROM_EMAIL,
                   recipient_list=(settings.ADMIN_MAIL, ))
