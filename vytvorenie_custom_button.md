### Blok: Vytvorenie / úprava custom-button ( užívateľských tlačidiel )

**Kedy toto použiť:** Keď potrebujeme nanovo vytvoriť, alebo upraviŤ existujúce používateľské tlačidlo / tlačidlá  v rôznych evidenciách

**Skopírovaný JSON z Make modulu:**

{
    "subflows": [
        {
            "flow": [
                {
                    "id": 2,
                    "module": "flexibee:MakeAPICall",
                    "version": 1,
                    "parameters": {
                        "__IMTCONN__": 2450822
                    },
                    "mapper": {
                        "qs": [],
                        "url": "/custom-button",
                        "body": "{\r\n  \"winstrom\": {\r\n    \"custom-button\": [\r\n      {\r\n        \"id\": \"code:MESACNY-REPORT-FAV\",\r\n        \"kod\": \"MESACNY-REPORT-UZI\",\r\n        \"url\": \"https://abrareport-780136173096.europe-west1.run.app?firma=${companyUrl}&authSessionId=${authSessionId}\",\r\n        \"title\": \"Mesačný Report\",\r\n        \"description\": \"Otvorí mesačný finančný report firmy za minulý kalendárny mesiac\",\r\n        \"evidence\": \"faktura-vydana\",\r\n        \"location\": \"list\",\r\n        \"browser\": \"automatic\"\r\n      },\r\n      {\r\n        \"id\": \"code:MESACNY-REPORT-FAP\",\r\n        \"kod\": \"MESACNY-REPORT-FAP\",\r\n        \"url\": \"https://abrareport-780136173096.europe-west1.run.app?firma=${companyUrl}&authSessionId=${authSessionId}\",\r\n        \"title\": \"Mesačný Report\",\r\n        \"description\": \"Otvorí mesačný finančný report firmy za minulý kalendárny mesiac\",\r\n        \"evidence\": \"faktura-prijata\",\r\n        \"location\": \"list\",\r\n        \"browser\": \"automatic\"\r\n      },\r\n      {\r\n        \"id\": \"code:MESACNY-REPORT-ZAV\",\r\n        \"kod\": \"MESACNY-REPORT-ZAV\",\r\n        \"url\": \"https://abrareport-780136173096.europe-west1.run.app?firma=${companyUrl}&authSessionId=${authSessionId}\",\r\n        \"title\": \"Mesačný Report\",\r\n        \"description\": \"Otvorí mesačný finančný report firmy za minulý kalendárny mesiac\",\r\n        \"evidence\": \"zavazek\",\r\n        \"location\": \"list\",\r\n        \"browser\": \"automatic\"\r\n      },\r\n      {\r\n        \"id\": \"code:MESACNY-REPORT-POK\",\r\n        \"kod\": \"MESACNY-REPORT-POK\",\r\n        \"url\": \"https://abrareport-780136173096.europe-west1.run.app?firma=${companyUrl}&authSessionId=${authSessionId}\",\r\n        \"title\": \"Mesačný Report\",\r\n        \"description\": \"Otvorí mesačný finančný report firmy za minulý kalendárny mesiac\",\r\n        \"evidence\": \"pokladni-pohyb\",\r\n        \"location\": \"list\",\r\n        \"browser\": \"automatic\"\r\n      },\r\n      {\r\n        \"id\": \"code:PREPOCET-KOEF-FAP\",\r\n        \"kod\": \"PREPOCET-KOEF-FAP\",\r\n        \"url\": \"https://abrabuttontlacidlo-780136173096.europe-west1.run.app?ids=${objectIds}&evidence=${evidence}&firma=${companyUrl}&authSessionId=${authSessionId}\",\r\n        \"title\": \"Prepočet Koeficientom\",\r\n        \"description\": \"Hromadný prepočet vybraných prijatých faktúr DPH koeficientom\",\r\n        \"evidence\": \"faktura-prijata\",\r\n        \"location\": \"list\",\r\n        \"browser\": \"automatic\"\r\n      },\r\n      {\r\n        \"id\": \"code:PREPOCET-KOEF-FAP-D\",\r\n        \"kod\": \"PREPOCET-KOEF-FAP-D\",\r\n        \"url\": \"https://abrabuttontlacidlo-780136173096.europe-west1.run.app?ids=${object.id}&evidence=${evidence}&firma=${companyUrl}&authSessionId=${authSessionId}\",\r\n        \"title\": \"Prepočet Koeficientom\",\r\n        \"description\": \"Prepočet tejto faktúry DPH koeficientom\",\r\n        \"evidence\": \"faktura-prijata\",\r\n        \"location\": \"detail\",\r\n        \"browser\": \"automatic\"\r\n      },\r\n      {\r\n        \"id\": \"code:PREPOCET-KOEF-ZAV\",\r\n        \"kod\": \"PREPOCET-KOEF-ZAV\",\r\n        \"url\": \"https://abrabuttontlacidlo-780136173096.europe-west1.run.app?ids=${objectIds}&evidence=${evidence}&firma=${companyUrl}&authSessionId=${authSessionId}\",\r\n        \"title\": \"Prepočet Koeficientom\",\r\n        \"description\": \"Hromadný prepočet vybraných záväzkov DPH koeficientom\",\r\n        \"evidence\": \"zavazek\",\r\n        \"location\": \"list\",\r\n        \"browser\": \"automatic\"\r\n      },\r\n      {\r\n        \"id\": \"code:PREPOCET-KOEF-ZAV-D\",\r\n        \"kod\": \"PREPOCET-KOEF-ZAV-D\",\r\n        \"url\": \"https://abrabuttontlacidlo-780136173096.europe-west1.run.app?ids=${object.id}&evidence=${evidence}&firma=${companyUrl}&authSessionId=${authSessionId}\",\r\n        \"title\": \"Prepočet Koeficientom\",\r\n        \"description\": \"Prepočet tohto záväzku DPH koeficientom\",\r\n        \"evidence\": \"zavazek\",\r\n        \"location\": \"detail\",\r\n        \"browser\": \"automatic\"\r\n      },\r\n      {\r\n        \"id\": \"code:PREPOCET-KOEF-POK\",\r\n        \"kod\": \"PREPOCET-KOEF-POK\",\r\n        \"url\": \"https://abrabuttontlacidlo-780136173096.europe-west1.run.app?ids=${objectIds}&evidence=${evidence}&firma=${companyUrl}&authSessionId=${authSessionId}\",\r\n        \"title\": \"Prepočet Koeficientom\",\r\n        \"description\": \"Hromadný prepočet vybraných pokladničných pohybov DPH koeficientom\",\r\n        \"evidence\": \"pokladni-pohyb\",\r\n        \"location\": \"list\",\r\n        \"browser\": \"automatic\"\r\n      },\r\n      {\r\n        \"id\": \"code:PREPOCET-KOEF-POK-D\",\r\n        \"kod\": \"PREPOCET-KOEF-POK-D\",\r\n        \"url\": \"https://abrabuttontlacidlo-780136173096.europe-west1.run.app?ids=${object.id}&evidence=${evidence}&firma=${companyUrl}&authSessionId=${authSessionId}\",\r\n        \"title\": \"Prepočet Koeficientom\",\r\n        \"description\": \"Prepočet tohto pokladničného pohybu DPH koeficientom\",\r\n        \"evidence\": \"pokladni-pohyb\",\r\n        \"location\": \"detail\",\r\n        \"browser\": \"automatic\"\r\n      }\r\n    ]\r\n  }\r\n}",
                        "method": "POST",
                        "headers": [
                            {
                                "key": "Content-Type",
                                "value": "application/json"
                            }
                        ],
                        "_spolecnost": "feroveucto_s_r_o_"
                    },
                    "metadata": {
                        "designer": {
                            "x": -25,
                            "y": 14
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
                                    "label": "FÉROVÉúčto s.r.o.",
                                    "nested": [
                                        {
                                            "help": "Enter a path relative to `https://feroveucto0.flexibee.eu/c/pf_company_s__r__o_`. For example: `/smlouva`.",
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