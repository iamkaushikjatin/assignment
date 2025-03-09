# Project Setup

## Setting up PostgreSQL Database

1. Create a new database:
    You can write your preferable name instead of test
    ```sh
    CREATE DATABASE test;
    ```
2. Create Table:
    ```sh
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL, 
    name VARCHAR(100) NOT NULL,
    dob DATE NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other'))
    );
    ```

## Installing Dependencies

```sh
npm install
```

## Starting the Server

```sh
npm start
```