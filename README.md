# Installation:

First full this github using `git pull git@github.com:SMUEric1127/CS5330-Python-Backend.git`

Install Docker (if you haven't): [Docker Installation](https://docs.docker.com/engine/install/)

# How to use:

## 1. Start the containers:

At the current directory (where docker-compose.yml) is in, start the docker by

> docker compose up -d

-d is detached, just so we can close the command

This will start the mysql and the phpmyadmin so we can view the data (similar to MySQL workbench, but on the browser).

## 2. View your data (phpmyadmin):

Go to [http://localhost:8080](http://localhost:8080)

If you see cannot connect screen like below, this mean that the phpmyadmin boot up too fast (before the mysql complete booting itself), so we just need to hit retry and it will be connected.

<img width="640" alt="Screenshot 2023-12-04 at 4 18 44 PM" src="https://github.com/SMUEric1127/CS5330-Python-Backend/assets/85500156/769884e4-e709-40b6-99b7-a98ad9f43961">

After hit retry

<img width="640" alt="Screenshot 2023-12-04 at 4 19 02 PM" src="https://github.com/SMUEric1127/CS5330-Python-Backend/assets/85500156/e1f770df-8159-47d2-a0c4-93fc3e85c155">

Here you will see our database table, currently named: `dbproj`, click on that and we can see all of our rows and columns.

<img width="640" alt="Screenshot 2023-12-04 at 4 19 37 PM" src="https://github.com/SMUEric1127/CS5330-Python-Backend/assets/85500156/2994fcd7-d0f8-47e6-abd1-e54c62c68c34">

## 3. Stop the containers:

> docker compose down


# Contributions:
Eric Vu

<add your name here>
