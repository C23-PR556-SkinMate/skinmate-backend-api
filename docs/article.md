# Article

<<<<<<< HEAD
> This API provides endpoints that enable users to get article based on the skin issue they have with the help of tag query.
=======
> This API provides endpoints that enable users to get article or tips & tricks based on the skin issue they have with the help of tag query.
>>>>>>> a25ba4c3db6dd64c58d543af75fd448fb9466991

## Get Article

* Endpoint:
<<<<<<< HEAD
    * `GET /api/article?tags={skinProblem}`
=======
    * `GET /api/articles?tags={skinProblem}`
>>>>>>> a25ba4c3db6dd64c58d543af75fd448fb9466991

* Query:
    * `tags` (string, REQUIRED): The user's skin issue..

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
