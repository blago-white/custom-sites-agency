from django.template.defaulttags import register


@register.filter
def range_(a, b):
    return range(a, b)
