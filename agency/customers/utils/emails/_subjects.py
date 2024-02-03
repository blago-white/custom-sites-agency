from abc import ABCMeta, abstractmethod
import dataclasses


__all__ = ["CustomerSiteOrderSubject", "AdminSiteOrderSubject"]


class _OrderSubject(metaclass=ABCMeta):
    @abstractmethod
    def __repr__(self) -> str:
        pass


@dataclasses.dataclass
class CustomerSiteOrderSubject(_OrderSubject):
    def __repr__(self):
        return "Site Consultation"


@dataclasses.dataclass
class AdminSiteOrderSubject(_OrderSubject):
    def __repr__(self):
        return "New Customer Order"
