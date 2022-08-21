import os

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db
from model import PhoneBook
from schema import PhoneBook as SchemaPhoneBook

load_dotenv(".env")

app = FastAPI()

app.add_middleware(DBSessionMiddleware, db_url=os.environ["DATABASE_URL"])


@app.get("/",response_model=SchemaPhoneBook)
async def get_phone_number():
    data = db.session.query(PhoneBook).order_by(PhoneBook.lastname.asc())
    return {"data": data}


@app.post("/add-phoneNumber/", response_model=SchemaPhoneBook)
def add_phone_number(_phoneNumber: SchemaPhoneBook):
    db_phoneBook = PhoneBook(firstname=_phoneNumber.firstname, lastname=_phoneNumber.lastname, phonenumber=_phoneNumber.phonenumber)
    db.session.add(db_phoneBook)
    db.session.commit()
    return db_phoneBook

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)