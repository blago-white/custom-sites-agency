from django.http.request import HttpRequest


def get_ip_from_request(request: HttpRequest) -> str:
    return request.META.get("HTTP_X_FORWARDED_FOR", request.META.get("REMOTE_ADDR"))
