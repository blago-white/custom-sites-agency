from celery import shared_task
from django.conf import settings
from django.core import mail

from . import _messages, _subjects


__all__ = ["send_cutomer_order_email", "send_admin_order_email"]


@shared_task
def send_cutomer_order_email(customer_email: str) -> None:
    mail.send_mail(subject=_subjects.CustomerSiteOrderSubject(),
                   html_message=_messages.ORDER_THANKS,
                   message="",
                   from_email=settings.DEFAULT_FROM_EMAIL,
                   recipient_list=(customer_email, ))


@shared_task
def send_admin_order_email(customer_email: str) -> None:
    mail.send_mail(subject=_subjects.AdminSiteOrderSubject(),
                   html_message=_messages.ADMIN_ORDER_NOTIFICATION.format(
                       email=customer_email
                   ),
                   message="",
                   from_email=settings.DEFAULT_FROM_EMAIL,
                   recipient_list=(settings.ADMIN_MAIL, ))

