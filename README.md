# Installation:

First full this github using `git pull git@github.com:SMUEric1127/CS5330-Python-Backend.git`

Install Docker (if you haven't): [Docker Installation](https://docs.docker.com/engine/install/)

# How to use:

## 1. Start the containers:

At the current directory (where docker-compose.yml) is in, start the docker by

> docker compose -d

-d is detached, just so we can close the command

This will start the mysql and the phpmyadmin so we can view the data (similar to MySQL workbench, but on the browser).

## 2. View your data (phpmyadmin):

Go to [http://localhost:8080](http://localhost:8080)

If you see cannot connect screen like below, this mean that the phpmyadmin boot up too fast (before the mysql complete booting itself), so we just need to hit retry and it will be connected.
