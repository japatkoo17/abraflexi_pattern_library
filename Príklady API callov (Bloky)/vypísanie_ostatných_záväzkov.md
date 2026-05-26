### Blok: zoznam ostatných záväzkov

**Kedy toto použiť:** Keď potrebujeme získať podľa nejakého filtra ostatné záväzky

**Skopírovaný JSON z Make modulu:**

{
    "subflows": [
        {
            "flow": [
                {
                    "id": 9,
                    "module": "flexibee:MakeAPICall",
                    "version": 1,
                    "parameters": {
                        "__IMTCONN__": 2450822
                    },
                    "mapper": {
                        "qs": [],
                        "url": "/zavazek/query.json",
                        "body": "{\r\n  \"winstrom\": {\r\n    \"filter\": \"typUcOp.kod like '50/50' and duzpUcto >= '{{22.`Dátum od`}}' and duzpUcto <= '{{22.`Dátum do`}}'\",\r\n    \"limit\": \"0\",\r\n    \"@version\": \"1.0\"\r\n  }\r\n}",
                        "method": "POST",
                        "headers": [
                            {
                                "key": "Content-Type",
                                "value": "application/json"
                            }
                        ],
                        "_spolecnost": "{{22.ABRA_link}}"
                    },
                    "metadata": {
                        "designer": {
                            "x": 1060,
                            "y": 9,
                            "name": "ostatne zavazky"
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
                                    "mode": "edit",
                                    "nested": [
                                        {
                                            "help": "Enter a path relative to `https://feroveucto0.flexibee.eu/c/stepanek3d__s_r_o_`. For example: `/smlouva`.",
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

**API response:**