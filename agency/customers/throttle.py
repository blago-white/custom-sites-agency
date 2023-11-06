from rest_framework.throttling import AnonRateThrottle


CUSTOMER_CONTACTS_SEND_THROTTLE_RATE = "10/day"


class CustomerContactsSendThrottle(AnonRateThrottle):
    def get_rate(self):
        return CUSTOMER_CONTACTS_SEND_THROTTLE_RATE
