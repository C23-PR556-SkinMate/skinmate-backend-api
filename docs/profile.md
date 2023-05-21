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
        "profileImg": "https://storage.googleapis.com/skinmate-bucket/profile-picture/k1LZ8t8YwEdpdnjd4FAr-profile-picture.jpg",
        "displayName": "User",
        "description": "Hello world! I'm a random user",
        "dateOfBirth": "",
        "skinType": "dry",
        "gender": "female",
        "reminderDay": "",
        "reminderNight": "",
    },
    "message": "Successfully found the user profile",
    "success": true
}
```

* Notes:
    * The response is a JSON object with a `success` field indicating the success or failure of the request.
    * The data field contains the requested user profile with it's `displayName`, `description`, and other data.

## Update Profile

* Endpoint:
    * `PUT /api/profile/{uid}`

* Parameter:
    * `uid` (string, REQUIRED): The user's id.

* Content-Type:
    * `application/json`

* Authorization Header:
    * `Bearer {token}`

* Request Body: 
```json
{
    "displayName": "User",
    "description": "Hello world! I'm a random user",
    "dateOfBirth": "",
    "skinType": "dry",
    "gender": "female",
    "reminderDay": "",
    "reminderNight": "",
}
```

* Field Definitions:
    * `displayName` (string, OPTIONAL): The user's display name.
    * `description` (string, OPTIONAL): The user's description.
    * `dateOfBirth` (string, OPTIONAL): The user's date of birth with valid `DD/MM/YYYY` format.
    * `skinType` (string, OPTIONAL): The user's skin type, the valid skin type are `oily`, `dry`, and `oily-dry`.
    * `gender` (string, OPTIONAL): The user's gender, the valid gender are `male` and `female`.
    * `reminderDay` (string, OPTIONAL): The user's reminder preference for the day, please use valid `HH:mm:ss` format.
    * `reminderNight` (string, OPTIONAL): The user's reminder preference for the night, please use valid `HH:mm:ss` format.

* Response:
```json
{
    "message": "Successfully updated the user profile",
    "success": true
}
```

* Notes:
    * The response is a JSON object with a `success` field indicating the success or failure of the request.
    * Please atleast input one parameter to return a `success` response.

## Set Profile Picture

* Endpoint:
    * `POST /api/profile/upload`

* Content-Type:
    * **DON'T SET CONTENT-TYPE HEADER YOURSELF THE API WILL DECIDE!**

* Authorization Header:
    * `Bearer {token}`

* Request Body:
    * Make sure that you're using `Form Data` body type!

    | **Field** | **Value** | **Description** |
    |:---:|:---:|:---|
    | uid | String | The user's id |
    | file | File | Image file type either`.jpg`,`.jpeg`, or`.png` |

* Response:
```json
{
    "data": {
        "uid": "k1LZ8t8YwEdpdnjd4FAr",
        "profileImg": "https://storage.googleapis.com/skinmate-bucket/profile-picture/k1LZ8t8YwEdpdnjd4FAr-profile-picture.jpg"
    },
    "message": "Profile image has been successfully uploaded",
    "success": true
}
```

* Notes:
    * The response is a JSON object with a `success` field indicating the success or failure of the request.
    * The data field contains the user's  `uid` and the uploaded `profileImg` URL.