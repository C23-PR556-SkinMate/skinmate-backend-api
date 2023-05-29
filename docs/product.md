# Product

> This API provides endpoints that enable users to get products based on the skin issue they have with the help of tag query.

## Get Products

* Endpoint:
    * `GET /api/products?tag={skinIssue}&limit={numberOfProducts}`

* Query:
    * `tag` (string, REQUIRED): The user's skin issue.
    * `limit` (number, OPTIONAL): The length of retrieved products, default value is 5 products.

* Authorization Header:
    * `Bearer {token}`

* Response:
```json
{
  "data": {
    "tag": "acne",
    "products": [
      {
        "brand": "Brand A",
        "description": "Anti-Acne Face Wash",
        "price": 15.99,
        "tags": [
          "acne",
          "face wash"
        ]
      },
      {
        "brand": "Brand A",
        "description": "Oil-Free Acne Moisturizer",
        "price": 12.49,
        "tags": [
          "acne",
          "moisturizer"
        ]
      }
    ]
  },
  "message": "Successfully retrieved the products",
  "success": true
}
```

* Notes:
    * The response is a JSON object with a `success` field indicating the success or failure of the request.
    * The data field contains the skin issue `tag` and the retrieved `products`.

