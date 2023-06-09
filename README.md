# SkinMate Backend API Docs

The SkinMate Backend API provides functionalities related to user authentication, user profiles, scan results, image prediction, and product recommendation. 

The API is built using Node.js, Express, Multer, and the Firebase Admin SDK. User data is stored in Google Cloud Storage and Cloud Firestore, and the API is deployed on Google Cloud Run.

![Infra](https://i.imgur.com/CfvONTd.png)

## API Base URL

> https://skinmate-backend-api-vle27crhfa-et.a.run.app/

## Setup

Here is how to setup the api to run locally on your computer.

**1. Initialize Environment Variables**

```env
ACCESS_TOKEN_SECRET= #JWT secret token
GCS_BUCKET_1= #Main google cloud storage bucket name
GCS_BUCKET_PRODUCT= #Google cloud storage bucket name for products
```

**2. Create and Generate Service Account Key**

Open Google Cloud Platform console and go to `IAM & Admin` -> `Service Accounts` -> `Create Service Account`, add your service account details and select `Firebase Admin SDK Administrator Service Agent` role and click done. Go to the newly created service account, go to `Keys` tab and create a new JSON key.

Put the newly created service account key to config folder
```
.
├── config/
│   └── service-account.json
├── src/
└── index.js
```

**3. Run The API**

Install the required packages with

```
npm install
```

Run the API with either commands

```
npm run start
```

```
npm run dev
```

## List of Available Endpoint

1. Authentication
2. User Profile
3. Product Recommendation
4. Scan Result
5. Image Prediction

---

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
    * `displayName` (string, OPTIONAL): The user's display name.
    * `description` (string, OPTIONAL): The user's description.
    * `dateOfBirth` (string, OPTIONAL): The user's date of birth with valid `DD/MM/YYYY` format.
    * `skinType` (string, OPTIONAL): The user's skin type, the valid skin type are `oily`, `dry`, and `combination`.
    * `gender` (string, OPTIONAL): The user's gender, the valid gender are `male` and `female`.

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

---

# Profile

> This API provides endpoints that enable users to manage their profiles by retrieving or updating the user information. It also allows users to set or update their profile picture.

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
    * `skinType` (string, OPTIONAL): The user's skin type, the valid skin type are `oily`, `dry`, and `combination`.
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
    * `POST /api/profile/{uid}/upload`

* Parameter:
    * `uid` (string, REQUIRED): The user's id.

* Authorization Header:
    * `Bearer {token}`

* Request Body:
    * Make sure that you're using `Form Data` body type!

    | **Field** | **Value** | **Description** |
    |:---:|:---:|:---|
    | file | File | Image file type either `.jpg`, `.jpeg`, or `.png` |

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

---

# Product

> This API provides endpoints that enable users to get products based on the skin problem and skin type query.

## Get Products

* Endpoint:
    * `GET /api/products?problem={skinProblem}&skintype={skinType}&limit={numberOfProducts}`

* Query:
    * `problem` (string, OPTIONAL*): The user's skin problem, valid skin problems are `acnes`, `blackheads`, `darkspot`, and `wrinkles`.
    * `skintype` (string, OPTIONAL*): The user's skin type, valid skin types are `normal`, `oily`, `dry`, and `combination`.
    * `limit` (number, OPTIONAL): The length of retrieved products, default value is 5 products.

* Authorization Header:
    * `Bearer {token}`

* Response:
```json
{
    "data": {
      "skinTreatment": [
        {
          "price": "Rp 29.900",
          "id": 39,
          "label": "Face Mask",
          "brand": "MEDIHEAL",
          "productName": "THE I.P.I Brightening Ampoule Mask",
          "url": {
            "cover": "https://storage.googleapis.com/skinmate-api-product/skin-treatment/39.png",
            "external": "https://www.sociolla.com/sheet-mask/9037-ipi-lightmax-ampoule-mask-ex?gclid=Cj0KCQjwmtGjBhDhARIsAEqfDEefxPwixtOXGegxaUEGY2GYn9fCa5KuA1kVFudILdWmVcIaYDpCT9EaAlFWEALw_wcB"
          },
          "tags": "darkspot"
        }
      ],
      "dailyCare": [
        {
          "price": "Rp 168.500",
          "id": 18,
          "label": "Facial Wash",
          "brand": "NEUTROGENA ",
          "productName": "Oil-Free Acne Wash 175 ml",
          "url": {
            "cover": "https://storage.googleapis.com/skinmate-api-product/daily-care/18.png",
            "external": "https://www.sociolla.com/face-wash/32316-oil-free-acne-wash?size=175_ml&gclid=Cj0KCQjw4NujBhC5ARIsAF4Iv6eccg9CbD4CX4zijTlN9G4Ne-bh3c3D6KRf05kIJ6W0-O0rsioF34kaAuljEALw_wcB"
          },
          "tags": "oily"
        }
      ]
    },
    "message": "Successfully retrieved the products",
    "success": true
}
```

* Notes:
    * The response is a JSON object with a `success` field indicating the success or failure of the request.
    * The data field contains the retrieved `skinTreatment` and `dailyCare` products.
    * *You must atleast query one of them either the `problem` or the `skintype` query.

---

# Article

> This API provides endpoints that enable users to get article or tips & trick based on the skin issue they have with the help of tag query.

## Get Article

* Endpoint:
    * `GET /api/articles?tags={skinProblem}`

* Query:
    * `tags` (string, REQUIRED): The user's skin issue, valid skin issue are `acnes`, `wrinkles`, `darkspot`, and `blackheads`.

* Authorization Header:
    * `Bearer {token}`

* Response:
```json
{
    "data": [
        {
            "id": 3,
            "title": "Dark Spots (Noda Hitam)",
            "tags": "darkspot",
            "content": "Noda hitam (dark spot) adalah kondisi bintik-bintik pada kulit yang berwarna terang hingga gelap atau coklat tua dan dapat berkembang di berbagai bagian tubuh...",
            "tips": [
                "Melindungi kulit dari paparan langsung sinar matahari",
                "Menggunakan produk perawatan pencerah kulit",
                "Melakukan konsultasi dan perawatan"
            ]
        }
    ],
    "message": "Successfully retrieved the article",
    "success": true
}
```

* Notes:
    * The response is a JSON object with a `success` field indicating the success or failure of the request.
    * The data field contains the retrieved article based on `tags`.

