from django.conf import settings


ERROR_MAIL_SEND = "Some error with mail sending error occured"


with open(
        settings.BASE_DIR / "templates/messages/order-thanks.html"
) as html_layout:
    ORDER_THANKS = "".join(html_layout.readlines())


with open(
        settings.BASE_DIR / "templates/messages/order-admin.html"
) as html_layout:
    ADMIN_ORDER_NOTIFICATION = "".join(html_layout.readlines())
