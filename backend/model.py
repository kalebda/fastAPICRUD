from sqlalchemy import String,Column,Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Mapped

Base = declarative_base()

class PhoneBook(Base):
    __tablename__ = "phone_book"
    id: Mapped[int] = Column(Integer,primary_key=True)
    firstname: Mapped[str] = Column(String(30))
    lastname: Mapped[str] = Column(String(30))
    phonenumber:Mapped[str] = Column(String(30))
    def __repr__(self) -> str:
        return f"PhoneBook(id={self.id!r}, firstname={self.firstname!r}, lastname={self.lastname!r}),phonenumber={self.phonenumber!r}"

