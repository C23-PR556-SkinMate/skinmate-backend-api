# Authentication

> This API provides endpoints for user registration and login, allowing users to create an account and authenticate themselves within the application.

## Register

* Endpoint:
    * `POST /api/register`

* Content-Type:
    * `application/json`

* Request Body: 
```json
{
    "email": "someuser@example.com",
    "password": "somesecretpassword",
    "displayName": "User",
    "description": "Hello world! I'm a random user"
}
```

* Field Definitions:
    * `email` (string, REQUIRED): The user's email address.
    * `password` (string, REQUIRED): The user's password.
    * `displayName` (string, OPTIONAL): The user's display name, default value is taken from email name.
    * `description` (string, OPTIONAL): The user's description, default value is empty string.

* Response:
```json
{
    "message": "Registered successfully",
    "success": true
}
```

* Notes:
    * The response is a JSON object with a `success` field indicating the success or failure of the request.

## Login

* Endpoint:
    * `POST /api/login`

* Content-Type:
    * `application/json`

* Request Body: 
```json
{
    "email": "someuser@example.com",
    "password": "somesecretpassword"
}
```

* Field Definitions:
    * `email` (string, REQUIRED): The user's email address.
    * `password` (string, REQUIRED): The user's password.


* Response:
```json
{
    "data": {
        "uid": "k1LZ8t8YwEdpdnjd4FAr",
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODQzODc0MjEsImlhdCI6MTY4NDM4NzQyMX0.xW9CFlrWyNbnGiHj3WlXfhnAbA3ZnYvHeljdpJm4ls4"
    },
    "message": "Logged in successfully",
    "success": true
}
```

* Notes:
    * The response is a JSON object with a `success` field indicating the success or failure of the request.
    * The `data` field contains the newly created user object with it's `uid` and `token`.