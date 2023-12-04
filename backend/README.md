# Installation: 

First full this github using `git pull git@github.com:SMUEric1127/CS5330-Python-Backend.git`

Install the requirements using `pip install -r requirements.txt` (If this doesn't work, try pip3)

# How to use:

To run it, enter in your terminal:

`uvicorn main:server --reload`

There are three examples in the server.py that cover: simple GET, GET with Params, and POST with more complicated data (JSON,... etc.)

To test without a frontend, go to: `http://127.0.0.1:8000/docs` it should allow you to test different backend function, here are one example for the POST with a custom User Schema:

First off this is how it looks like, notice there is a schema in the bottom named UserCreate, I have written this schema in server.py. On the top of the page there are 3 Rest API that we have created.

<img width="640" alt="image" src="https://github.com/SMUEric1127/CS5330-Python-Backend/assets/85500156/45bb85d1-d9bf-402b-a2e9-2cb775e2bb2d">

Click "POST: /create_user/" it should be a drop-down like this:

<img width="640" alt="image" src="https://github.com/SMUEric1127/CS5330-Python-Backend/assets/85500156/a31c1c6b-bcdd-4396-9676-c928c273e8a5">

Then click "Try it out" then it will allow us to send a JSON object:

<img width="640" alt="image" src="https://github.com/SMUEric1127/CS5330-Python-Backend/assets/85500156/6f64af48-3ea4-4e97-80fa-e1b39fac8049">

Then we can execute and receive the output right after the input box, with the status code and everything

<img width="640" alt="image" src="https://github.com/SMUEric1127/CS5330-Python-Backend/assets/85500156/c9ffc24c-2bb4-411d-bc06-9ea2e7545b6f">

# Contributions:

Eric Vu

<Fill in your name here if you want to be on here!>
