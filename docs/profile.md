# Profile

> This API provides endpoints for getting and updating the user profile.

## Get Profile

* Endpoint:
    * `GET /api/profile/{uid}`

* Parameter:
    * `uid` (string, REQUIRED): The user's id.

* Authorization Header:
    * `Bearer {token}`

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
    "uid": "k1LZ8t8YwEdpdnjd4FAr",
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

## Set Profile Picture

* Endpoint:
    * `POST /api/profile/upload`

* Content-Type:
    * `multipart/form-data`

* Authorization Header:
    * `Bearer {token}`

* Request Body:
    * Make sure that you're using `multipart/form-data` content type!

    | **Field** | **Value** | **Description** |
    |:---:|:---:|:---|
    | uid | String | The user's id |
    | file | File | Image file type either .jpg or .png |

* Response:
```json
{
    "data": {
        "uid": "k1LZ8t8YwEdpdnjd4FAr",
        "profileImg": "https://storage.googleapis.com/skinmate-bucket/profile-picture/default-profile-pic.jpg"
    },
    "message": "Profile image has been successfully uploaded",
    "success": true
}
```