### Blok: Vytvorenie / úprava nových účtov v konkrétnom klientovi

**Kedy toto použiť:** Keď potrebujeme nanovo založiť úČty klientovi pri prvotnom nastavení, alebo keď potrebujeme vytvoriŤ úČty lebo chceme vytvoriŤ neskôr nové predpisy ktoré uŽ musia tieto účty mať. PRÍPADNE !! Keď chceme len upraviŤ už existujúce tak toto volanie ich buď vytvorí, alebo upraví. 

**Skopírovaný JSON z Make modulu:**

{
    "subflows": [
        {
            "flow": [
                {
                    "id": 21,
                    "module": "flexibee:MakeAPICall",
                    "version": 1,
                    "parameters": {
                        "__IMTCONN__": 2450822
                    },
                    "mapper": {
                        "qs": [],
                        "url": "ucet.json",
                        "body": "{\r\n  \"winstrom\": {\r\n    \"ucet\": [\n\r\n      {\n        \"id\": \"code:501050\",\n        \"kod\": \"501050\",\r\n        \"nazev\": \"PHM 50/50\",\r\n        \"danovy\": true\r\n      },\n\r\n      {\n        \"id\": \"code:501550\",\n        \"kod\": \"501550\", \r\n        \"nazev\": \"PHM nedaňové 50/50\",\r\n        \"danovy\": false\r\n      },\n\n      {\n        \"id\": \"code:511050\",\r\n        \"kod\": \"511050\",\r\n        \"nazev\": \"Servis auta 50/50\",\r\n        \"danovy\": true\r\n      },\n\r\n      {\n        \"id\": \"code:511550\",\r\n        \"kod\": \"511550\", \r\n        \"nazev\": \"Servis auta nedaňové 50/50\",\r\n        \"danovy\": false\r\n      },\n\n      {\n        \"id\": \"code:538050\",\r\n        \"kod\": \"538050\",\r\n        \"nazev\": \"Auto poplatky 50/50\",\r\n        \"danovy\": true\r\n      },\n\r\n      {\n        \"id\": \"code:538550\",\r\n        \"kod\": \"538550\", \r\n        \"nazev\": \"Auto poplatky nedaňové 50/50\",\r\n        \"danovy\": false\r\n      },\n      {\n        \"id\": \"code:518050\",\r\n        \"kod\": \"518050\",\r\n        \"nazev\": \"Auto služby 50/50\",\r\n        \"danovy\": true\r\n      },\n\r\n      {\n        \"id\": \"code:518550\",\r\n        \"kod\": \"518550\", \r\n        \"nazev\": \"Auto služby nedaňové 50/50\",\r\n        \"danovy\": false\r\n      },\n      {\n        \"id\": \"code:343010\",\r\n        \"kod\": \"343010\",\r\n        \"nazev\": \"Daň z pridanej hodnoty - 10%\",\r\n        \"danovy\": true\r\n      },\n      {\n        \"id\": \"code:343020\",\r\n        \"kod\": \"343020\",\r\n        \"nazev\": \"Daň z pridanej hodnoty - 20%\",\r\n        \"danovy\": true\r\n      }\n    ]\r\n  }\r\n}",
                        "method": "POST",
                        "headers": [
                            {
                                "key": "Content-Type",
                                "value": "application/json"
                            }
                        ],
                        "_spolecnost": "okreklama_bb_s__r__o_"
                    },
                    "metadata": {
                        "designer": {
                            "x": 1120,
                            "y": 449,
                            "name": "Vytvor (uprav) nové účty (10)"
                        },
                        "restore": {
                            "expect": {
                                "method": {
                                    "label": "POST"
                                },
                                "headers": {
                                    "items": [
                                        null
                                    ]
                                },
                                "_spolecnost": {
                                    "mode": "chose",
                                    "label": "OKreklama BB s. r. o.",
                                    "nested": [
                                        {
                                            "help": "Enter a path relative to `https://feroveucto0.flexibee.eu/c/bc__marcel_kortis1`. For example: `/smlouva`.",
                                            "name": "url",
                                            "type": "text",
                                            "label": "URL",
                                            "required": true
                                        }
                                    ]
                                }
                            },
                            "parameters": {
                                "__IMTCONN__": {
                                    "data": {
                                        "scoped": "true",
                                        "connection": "flexibee"
                                    },
                                    "label": "ABRA_API_FU"
                                }
                            }
                        },
                        "parameters": [
                            {
                                "name": "__IMTCONN__",
                                "type": "account:flexibee",
                                "label": "Connection",
                                "required": true
                            }
                        ],
                        "expect": [
                            {
                                "name": "_spolecnost",
                                "type": "select",
                                "label": "Společnost",
                                "required": true
                            },
                            {
                                "name": "method",
                                "type": "select",
                                "label": "Method",
                                "required": true,
                                "validate": {
                                    "enum": [
                                        "GET",
                                        "POST",
                                        "PUT",
                                        "PATCH",
                                        "DELETE"
                                    ]
                                }
                            },
                            {
                                "name": "headers",
                                "spec": [
                                    {
                                        "name": "key",
                                        "type": "text",
                                        "label": "Key"
                                    },
                                    {
                                        "name": "value",
                                        "type": "text",
                                        "label": "Value"
                                    }
                                ],
                                "type": "array",
                                "label": "Headers"
                            },
                            {
                                "name": "qs",
                                "spec": [
                                    {
                                        "name": "key",
                                        "type": "text",
                                        "label": "Key"
                                    },
                                    {
                                        "name": "value",
                                        "type": "text",
                                        "label": "Value"
                                    }
                                ],
                                "type": "array",
                                "label": "Query String"
                            },
                            {
                                "name": "body",
                                "type": "any",
                                "label": "Body"
                            },
                            {
                                "name": "url",
                                "type": "text",
                                "label": "URL",
                                "required": true
                            }
                        ]
                    }
                }
            ]
        }
    ],
    "metadata": {
        "version": 1
    }
}