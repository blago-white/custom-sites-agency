from django.conf import settings


ERROR_MAIL_SEND = "Some error with mail sending error occured"


with open(
        settings.BASE_DIR / "templates/messages/order-thanks.html", "rb"
) as html_layout:
    ORDER_THANKS = str(html_layout.read())


with open(
        settings.BASE_DIR / "templates/messages/order-admin.html", "rb"
) as html_layout:
    ADMIN_ORDER_NOTIFICATION = str(html_layout.read())
