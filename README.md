# chitchat-server

## Enpoints

List of available endpoints:

* `POST` /register
* `POST` /login
* `GET` /users
* `POST` /messages/:id
* `GET` /messages/:id

## 1. `POST` /register

Register a new user.

#### Request:

* body
  

```json
  {
    "username": "user1",
    "fullName": "User One",
    "password": "password1",
    "confirmPassword": "password1",
    "gender": "male"
  }
  ```

_response (201 - OK)_

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "fullName": "User One",
    "username": "user1",
    "profilePic": "https://avatar.iran.liara.run/public/boy?username=user1",
    "access_token": "string"
  }
}
```

_response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
  OR
{
  "message": "Full name is required"
}
  OR
{
  "message": "Password and confirm password must be the same"
}
  OR
{
  "message": "Gender is required"
}
  OR
{
  "message": "username must be unique"
}
```

## 2. `POST` /login

Login to an existing user.

#### Request:

* body
  

```json
  {
    "username": "user1",
    "password": "password1"
  }
  ```

_response (200 - OK)_

```json
{
  "status": "success",
  "message": "User logged in successfully",
  "data": {
    "id": 1,
    "fullName": "User One",
    "username": "user1",
    "profilePic": "https://avatar.iran.liara.run/public/boy?username=user1",
    "access_token": "string"
  }
}
```

_response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
  OR
{
  "message": "Password is required"
}
  OR
{
  "message": "Invalid username or password"
}
```

## 3. `GET` /users

Get data for user

#### Request:

* header

```json
{
  "Authorization": "Bearer string"
}
```

_response (200 - OK)_
