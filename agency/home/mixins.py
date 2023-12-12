from django.utils.translation import get_language
from django.conf import settings

from . import config


class MultilangHomeViewMixin:
    def get_context_data(self, **kwargs) -> dict:
        context = super().get_context_data(**kwargs)

        context.update({config.LANG_CODE_TEMPLATE_NAME: settings.DEFAULT_LANGUAGE})

        if config.LANG_CODE_URL_ARG_NAME in self.kwargs:
            context[config.LANG_CODE_TEMPLATE_NAME] = self.kwargs.get(config.LANG_CODE_URL_ARG_NAME)

        return context
