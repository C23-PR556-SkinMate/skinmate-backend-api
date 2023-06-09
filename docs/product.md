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

