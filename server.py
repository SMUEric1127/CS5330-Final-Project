from fastapi import FastAPI, Query
from pydantic import BaseModel

# alternative: import every thing:
# from database_source.query import *
from database_source.query import exampleQuery, exampleQueryParam

app = FastAPI()


@app.get("/")
async def root():
    # Get something simple without any params
    return {"statusCode": 200, "result": exampleQuery()}


@app.get("/params")
async def root(param1: str = Query(..., description="Write your description for param1")):
    # Get with param, in case we want to have some input from the user
    # the ... in Query means it's required

    result = exampleQueryParam(param1)
    return {"message": "Successfully get!", "result": result}


class UserCreate(BaseModel):
    username: str
    password: str


@app.post("/create_user/")
async def create_user(user: UserCreate):
    # Example of post, if we want to send something more than just some params (a json...)
    # Using Pydantic to make sure our data is validated (Like if we only want a username, password, not every other thing)

    user_data = {"username": user.username, "password": user.password}

    return {"message": "User created successfully using POST API", "user_data": user_data}
