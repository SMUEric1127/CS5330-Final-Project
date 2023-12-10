# Demo:

You can test the application live here:

[https://edutrack.vonspace.co/](https://edutrack.vonspace.co/)

# Installation:

First full this github using `git clone git@github.com:SMUEric1127/CS5330-Final-Project.git`

Install Docker (if you haven't): [Docker Installation](https://docs.docker.com/engine/install/)

# How to use:

## 1. Start the containers:

At the current directory (where docker-compose.yml) is in, start the docker by

> docker compose up -d

-d is detached, just so we can close the command

This will start the mysql and the phpmyadmin so we can view the data (similar to MySQL workbench, but on the browser).

## 2. Verify the Backend started (Important, this need to be check so that the mysql connection is confirmed):

Return something like the following should make the application ready to function properly.

![Screenshot 2023-12-10 at 4 55 14 AM](https://github.com/SMUEric1127/CS5330-Final-Project/assets/85500156/804219ef-be4e-430c-852f-fe0781e6ecdb)

## 3. View your data (Admin View):

Go to [http://localhost:8080/dashboard](http://localhost:8080/dashboard)

Click "View as Admin" on the top right. This will show all the data (To be implemented: If we have time we would implement Authentication for this)

![Screenshot 2023-12-10 at 4 51 59 AM](https://github.com/SMUEric1127/CS5330-Final-Project/assets/85500156/1a9e7d23-7c26-4a99-b616-7fc3ef832e0b)

On the left hand side there will be all available tables for you to choose and view the data from:

![Screenshot 2023-12-10 at 4 56 12 AM](https://github.com/SMUEric1127/CS5330-Final-Project/assets/85500156/3f857c4c-1b4e-4dcb-8ece-21735c350656)

## 4. Stop the containers:

> docker compose down

# Contributions:

Vu, Eric

Matthews, Christopher

Kucera, Matt

Castellano, Nino
