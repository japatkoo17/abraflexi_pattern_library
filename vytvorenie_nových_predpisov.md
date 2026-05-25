### Blok: Vytvorenie / úprava nových predpisov v konkrétnom klientovi

**Kedy toto použiť:** Keď potrebujeme nanovo založiť úČty klientovi pri prvotnom nastavení, alebo keď potrebujeme vytvoriŤ úČty lebo chceme vytvoriŤ neskôr nové predpisy ktoré uŽ musia tieto účty mať. PRÍPADNE !! Keď chceme len upraviŤ už existujúce tak toto volanie ich buď vytvorí, alebo upraví. 

**Skopírovaný JSON z Make modulu:**

{
    "subflows": [
        {
            "flow": [
                {
                    "id": 22,
                    "module": "flexibee:MakeAPICall",
                    "version": 1,
                    "parameters": {
                        "__IMTCONN__": 2450822
                    },
                    "mapper": {
                        "qs": [],
                        "url": "/predpis-zauctovani.json",
                        "body": "{\r\n  \"winstrom\": {\r\n    \"predpis-zauctovani\": [\n\r\n      {\n        \"id\": \"code:AUTO DROBNOSTI 50/50\",\r\n        \"kod\": \"AUTO DROBNOSTI 50/50\", \r\n        \"nazev\": \"Auto drobnosti 50/50\",\r\n        \"kodPlneniK\": \"kodPlneni.zbozi\",\n        \"protiUcetVydej\": \"code:501050\",\n        \"dphSnizUcet\": \"code:343010\",\n        \"dphZaklUcet\": \"code:343020\",\n        \"modulFap\": true,\n        \"modulZav\": true,\n        \"modulPokV\": true\n      },\n\n    {\n\n        \"id\": \"code:AUTO POPL 50/50\",\r\n        \"kod\": \"AUTO POPL 50/50\", \r\n        \"nazev\": \"Auto poplatky 50/50\",\r\n        \"kodPlneniK\": \"kodPlneni.sluzby\",\n        \"protiUcetVydej\": \"code:538550\",\n        \"dphSnizUcet\": \"code:343010\",\n        \"dphZaklUcet\": \"code:343020\",\n        \"modulFap\": true,\n        \"modulZav\": true,\n        \"modulPokV\": true\n      },\n\n    {\n        \"id\": \"code:AUTO SERVIS 50/50\",\r\n        \"kod\": \"AUTO SERVIS 50/50\", \r\n        \"nazev\": \"Auto servis 50/50\",\r\n        \"kodPlneniK\": \"kodPlneni.sluzby\",\n        \"protiUcetVydej\": \"code:511050\",\n        \"dphSnizUcet\": \"code:343010\",\n        \"dphZaklUcet\": \"code:343020\",\n        \"modulFap\": true,\n        \"modulZav\": true,\n        \"modulPokV\": true\n      },\n\n    {\n        \"id\": \"code:NÁKUP PHM 50/50\",\r\n        \"kod\": \"NÁKUP PHM 50/50\", \r\n        \"nazev\": \"Nákup PHM 50/50\",\r\n        \"kodPlneniK\": \"kodPlneni.zbozi\",\n        \"protiUcetVydej\": \"code:501050\",\n        \"dphSnizUcet\": \"code:343010\",\n        \"dphZaklUcet\": \"code:343020\",\n        \"modulFap\": true,\n        \"modulZav\": true,\n        \"modulPokV\": true\n      },\n{\n        \"id\": \"code:AUTO SLUŽBY 50/50\",\r\n        \"kod\": \"AUTO SLUŽBY 50/50\", \r\n        \"nazev\": \"Auto služby 50/50\",\r\n        \"kodPlneniK\": \"kodPlneni.sluzby\",\n        \"protiUcetVydej\": \"code:518050\",\n        \"dphSnizUcet\": \"code:343010\",\n        \"dphZaklUcet\": \"code:343020\",\n        \"modulFap\": true,\n        \"modulZav\": true,\n        \"modulPokV\": true\n      }\n    ]\r\n  }\r\n}",
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
                            "x": 1530,
                            "y": 446,
                            "name": "Vytvor (uprav) predpisy zaúčtovania (5)"
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