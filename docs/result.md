# Result

> This API provides endpoints that enable users to get results and scan facial skin problems.

## Get Results

* Endpoint:
    * `GET /api/result?limit={numberOfResults}`

* Query:
    * `limit` (number, OPTIONAL): The length of retrieved results, default value is all of the results.

* Authorization Header:
    * `Bearer {token}`

* Response:
```json
{
    "data": {
        "results": [
            {
                "date": "09/06/2023",
                "problem": "acnes",
                "unix": 1686313820324
            }
        ]
    },
    "message": "Results has been retrieved successfully",
    "success": true
}
```

* Notes:
    * The response is a JSON object with a `success` field indicating the success or failure of the request.
    * The data field contains the retrieved `results`.

## Scan Facial Problem

* Endpoint:
    * `GET /api/result/predict`

* Request Body:
    * Make sure that you're using `Form Data` body type!

    | **Field** | **Value** | **Description** |
    |:---:|:---:|:---|
    | file | File | Image file type either`.jpg`,`.jpeg`, or`.png` |

* Authorization Header:
    * `Bearer {token}`

* Response:
```json
{
    "data": {
        "article": [
            {
                "id": 1,
                "title": "Acnes (Jerawat)",
                "tips": [
                    "Membersihkan wajah secara teratur",
                    "Menggunakan produk perawatan yang tepat",
                    "..."
                ],
                "tags": "acnes",
                "content": "..."
            }
        ],
        "problem": "acnes",
        "skintype": "dry",
        "products": {
            "skinTreatment": [
                {
                    "price": "Rp 154.300",
                    "id": 12,
                    "label": "Treatment/Serum",
                    "brand": "AVOSKIN",
                    "productName": "YOUR SKIN BAE SERIES ByeAcne ByeBlackhead Salicylic Acid 2% + Zinc",
                    "url": {
                        "cover": "https://storage.googleapis.com/skinmate-api-product/skin-treatment/12.png",
                        "external": "https://www.sociolla.com/face-serum/52502-your-skin-bae-series-byeacne-byeblackhead-salicylic-acid-2-zinc"
                    },
                    "tags": "acnes"
                }
            ],
            "dailyCare": [
                {
                    "price": "Rp 199.000",
                    "id": 29,
                    "label": "Facial Wash",
                    "brand": "SOMETHINC",
                    "productName": "Low pH Gentle Jelly Cleanser",
                    "url": {
                        "cover": "https://storage.googleapis.com/skinmate-api-product/daily-care/29.png",
                        "external": "https://www.beautyhaul.com/product/detail/low-ph-gentle-jelly-cleanser"
                    },
                    "tags": "dry"
                }
            ]
        }
    },
    "message": "Results has been predicted and saved successfully",
    "success": true
}
```

* Notes:
    * The response is a JSON object with a `success` field indicating the success or failure of the request.
    * The data field contains the retrieved `results`.
