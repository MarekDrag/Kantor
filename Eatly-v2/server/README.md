# Sewio-Backend
**Swagger:** localhost:3000/api
## Table of Contens
- [Technologies](#technologies)
- [Setup](#setup)
- [Useful Commands](#useful-commands)
- [PG admin](#pg-admin)
- [Sample Users](#sample-users)

## Technologies
- docker-compose: 2.4
## Setup

Download repo
```
$ git clone git@git.neurosys.com:praktyki-2022/sewio-backend.git
```
Install packages
```
$ cd sewio-backend
$ npm install
```
Run docker
```
$ docker-compose up -d
```
## Useful Commands
Disable docker
```
$ docker-compose down
```
Run seeds again: 
```
$ docker-compose exec backend sh
$ npx knex seed:run
$ exit
```
## PG Admin
port: http://127.0.0.1:5050

- Login to pg admin
    - login: developer@dev.com
    - password: admin
- Add new server 
    - General
        - Name: Postgres
    - Connection
        - Host name: Postgres
        - Username: admin
        - Password: secret
    - Save
- To see the data:
Postgres -> Databases -> dev -> schemas -> tables -> View/Edit Data - > All rows


## Sample Users
**Super Admin:**

|      email      | username | password |
|-----------------|----------|----------|
| bartek@kowal.pl | barkow   | pass     |    

**Admins:**

|     email       | username      | password |
|-----------------|---------------|----------|
| marek@gmail.com | mareknowak    | pass     |
| dawid@gmail.com | dawidkowalski | pass     |

**Drivers / participants:**

| email              | username | password |
|--------------------|----------|----------|
| lewy123@wp.pl      | tomlew   | pass     |
| leo@barca.es       | leomes   | pass     |
| krystian@gmail.com | krysnal  | pass     |
| damian@onet.pl     | damlons  | pass     |

