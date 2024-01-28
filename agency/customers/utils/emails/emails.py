from .tasks import send_admin_order_email, send_cutomer_order_email


__all__ = ["on_submit_order"]


def on_submit_order(target_email: str) -> None:
    send_cutomer_order_email.delay(customer_email=target_email)
    send_admin_order_email.delay(customer_email=target_email)
