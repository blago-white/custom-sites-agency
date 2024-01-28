import os

from pathlib import Path
from celery import Celery


main_app_name = Path(__file__).resolve().parent.name

os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      f"{main_app_name}.settings")

app = Celery(main=main_app_name)

app.config_from_object(
    'django.conf:settings', namespace='CELERY'
)

app.autodiscover_tasks()
