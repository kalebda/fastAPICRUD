from pydantic import BaseModel

class PhoneBook(BaseModel):
    firstname:str
    lastname:str
    phonenumber:str

    class Config:
        orm_mode = True