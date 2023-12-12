from django.utils import translation
from django.conf import settings

from . import config


class MultilangHomeViewMixin:
    _selected_language: str = None

    def get_context_data(self, **kwargs) -> dict:
        context = super().get_context_data(**kwargs)

        self._selected_language = self._get_selected_language_or_default()
        self._update_current_language()

        context[config.LANG_CODE_TEMPLATE_NAME] = self._selected_language

        return context

    def _update_current_language(self) -> None:
        if self._selected_language and self._selected_language != translation.get_language():
            translation.activate(self._selected_language)

    def _get_selected_language_or_default(self) -> str:
        return self.kwargs.get(config.LANG_CODE_URL_ARG_NAME) or settings.DEFAULT_LANGUAGE
