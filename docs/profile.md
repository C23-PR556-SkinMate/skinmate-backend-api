# Profile

> This API provides endpoints for getting and setting user profile.

## Get Profile

* Endpoint:
    * `GET /api/profile/{uid}`

* Query:
    * `uid` (string, REQUIRED): The user's id.

* Request Headers:
    * `Authorization`: `Bearer {token}`

* Response:
```json
{
    "data": {
        "displayName": "User",
        "description": "Hello world! I'm a random user"
    },
    "message": "Successfully found the user profile",
    "success": true
}
```

* Notes:
    * The response is a JSON object with a `success` field indicating the success or failure of the request.
    * The data field contains the requested user profile with it's `displayName` and `description`

## Set Profile

* Endpoint:
    * `POST /api/profile`

* Content-Type:
    * `application/json`

* Request Body: 
```json
{
    "displayName": "User",
    "description": "Hello world! I'm a random user"
}
```

* Field Definitions:
    * `displayName` (string, OPTIONAL): The user's display name, default value is taken from email name.
    * `description` (string, OPTIONAL): The user's description, default value is empty string.

* Response:
```json
{
    "message": "Successfully set the user profile",
    "success": true
}
```

* Notes:
    * The response is a JSON object with a `success` field indicating the success or failure of the request.
