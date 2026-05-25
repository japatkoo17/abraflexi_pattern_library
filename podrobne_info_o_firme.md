### Blok: Získanie podrobných dát o konkrétnej firme z našeho zoznamu z zoznam_vŠetkých_firiem.md

**Kedy toto použiť:** Keď sme uŽ načítali zoznam všetkých firiem a potrebujeme eŠte nejaké ďalšie podrobnejšie informácie o konkrétnej firme


**Skopírovaný JSON z Make modulu:**

{
    "subflows": [
        {
            "flow": [
                {
                    "id": 3,
                    "module": "flexibee:MakeAPICall",
                    "version": 1,
                    "parameters": {
                        "__IMTCONN__": 2450822
                    },
                    "filter": {
                        "name": "Ešte nie je v APKE",
                        "conditions": [
                            [
                                {
                                    "a": "{{map(19.array; \"`9`\")}}",
                                    "b": "{{2.dbNazev}}",
                                    "o": "array:notcontain"
                                }
                            ]
                        ]
                    },
                    "mapper": {
                        "qs": [],
                        "url": "/nastaveni.json?order=id@D&limit=1&detail=full",
                        "body": "",
                        "method": "GET",
                        "headers": [
                            {
                                "key": "Content-Type",
                                "value": "application/json"
                            }
                        ],
                        "_spolecnost": "{{2.dbNazev}}"
                    },
                    "metadata": {
                        "designer": {
                            "x": -323,
                            "y": -92,
                            "name": "Podrobne info KLIENT"
                        },
                        "restore": {
                            "expect": {
                                "method": {
                                    "label": "GET"
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
                                            "help": "Enter a path relative to `https://feroveucto0.flexibee.eu/c/`. For example: `/smlouva`.",
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
[{"body":{"winstrom":{"@version":"1.0","nastaveni":[{"id":"1","lastUpdate":"2026-04-16T11:31:11.414+02:00","platiOdData":"","nazFirmy":"EQIO s.r.o.","ic":"57560986","dic":"","eanKod":"","vatId":"","uliceNazev":"Bajkalská","cisPop":"12985","cisOr":"9B","mesto":"Bratislava","psc":"83104","www":"","email":"","datovaSchranka":"","fax":"","mobil":"","tel":"","postovniShodna":"true","faUliceNazev":"","faCisPop":"","faCisOr":"","faMesto":"","faPsc":"","fakturacniShodna":"true","postUliceNazev":"","postCisPop":"","postCisOr":"","postMesto":"","postPsc":"","spisZnac":"","spisZnacA":"","spisZnacB":"","spisZnacC":"","platceDph":"false","typUcJednotkyK":"typUcJednotky.mikro","typUcJednotkyK@showAs":"Mikro účetní jednotka","moss":"false","ossEU":"false","ossMimoEU":"false","ossDovoz":"false","omezovatVyberStatu":"false","cinnost":"","fyzOsoba":"false","fyzOsJmeno":"","fyzOsPrijmeni":"","fyzOsTitul":"","fyzOsTitulZa":"","oprPostav":"","oprPrijmeni":"","oprJmeno":"","podpisPrik":"false","podvojUcto":"true","intrastat":"false","splatDny":"14","splatDnyNakup":"","pravFormaPodnik":"Spoločnosť s ručením obmedzeným","zobrLogoK":"","sklUcto":"true","sklFifo":"false","sklGenerovatPozadavky":"false","adrKontrolovatFirmy":"true","sklAktualNakupCena":"false","autoZakazka":"false","avTranKod":"","avSmerKod":"","elPokExport":"","elPokImport":"","elPokIni":"","kurzDualMena":"0.0","doplnText":"","jazyk1K":"jazyk.sk","jazyk1K@showAs":"slovenština","jazyk2K":"jazyk.en","jazyk2K@showAs":"angličtina","jazyk3K":"jazyk.de","jazyk3K@showAs":"němčina","jazyk4K":"jazyk.fr","jazyk4K@showAs":"francouzština","logoPoziceK":"","rezimRezervaciK":"rezimRezervaci.rucni","rezimRezervaciK@showAs":"Pouze ruční","postMigrace":"false","firmaUUID":"3156a87d-06b0-492b-bc23-fdc3ea29ae46","rezervovatZapor":"false","zastupceTypK":"","zastupceKod":"","zastupceNazev":"","zastupceIc":"","zastupcePrijmeni":"","zastupceJmeno":"","zastupceDatNar":"","zastupceEvCislo":"","mzdSplatPrispevky":"","mzdFondSta":"0.0","denniKurzK":"denniKurz.predchoziDen","denniKurzK@showAs":"Z předchozího dne","rocniKurzK":"","jakyTypFavK":"jakyTypDokl.posledni","jakyTypFavK@showAs":"Poslední vybraný","jakyTypPhlK":"jakyTypDokl.posledni","jakyTypPhlK@showAs":"Poslední vybraný","jakyTypFapK":"jakyTypDokl.posledni","jakyTypFapK@showAs":"Poslední vybraný","jakyTypZavK":"jakyTypDokl.posledni","jakyTypZavK@showAs":"Poslední vybraný","jakyTypIntK":"jakyTypDokl.posledni","jakyTypIntK@showAs":"Poslední vybraný","jakyTypPppK":"jakyTypDokl.posledni","jakyTypPppK@showAs":"Poslední vybraný","jakyTypNavK":"jakyTypDokl.posledni","jakyTypNavK@showAs":"Poslední vybraný","jakyTypObpK":"jakyTypDokl.posledni","jakyTypObpK@showAs":"Poslední vybraný","jakyTypPpvK":"jakyTypDokl.posledni","jakyTypPpvK@showAs":"Poslední vybraný","jakyTypNapK":"jakyTypDokl.posledni","jakyTypNapK@showAs":"Poslední vybraný","jakyTypObvK":"jakyTypDokl.posledni","jakyTypObvK@showAs":"Poslední vybraný","jakyTypSklK":"jakyTypDokl.posledni","jakyTypSklK@showAs":"Poslední vybraný","jakyTypBanK":"jakyTypDokl.posledni","jakyTypBanK@showAs":"Poslední vybraný","jakyTypPokK":"jakyTypDokl.posledni","jakyTypPokK@showAs":"Poslední vybraný","prepocetCenK":"prepocetCen.none","prepocetCenK@showAs":"Neměnit ceny","manualCisDokl":"false","parovaniOtoceniUhrady":"false","prenFirStred":"false","odpocNeuhrZalFav":"false","odpocNeuhrZalFap":"false","zaokrNulovaSazba":"false","nace":"","osobUpravaDph":"false","fapDatProDuzpUctoK":"fapDatProDuzpUctoK.duzpPuv","fapDatProDuzpUctoK@showAs":"Datum zdaň. pl.","autoSendMailModK":"","autoSendMailBccEmail":"","zobrazWebModK":"zobrazWebKompMod.auto","zobrazWebModK@showAs":"Automatická volba","versionForCaching":"0","zpracovaniGdpr":"false","polozkyCenikObrazky":"false","datZacNovelyZdph19":"2019-10-01+02:00","mzdChranTrhPrace":"false","statLegislativa":"code:SK","statLegislativa@ref":"/c/eqio_s_r_o_/stat/152.json","statLegislativa@showAs":"Slovenská republika","typOrganizace":"code:PODNIKATELIA","typOrganizace@ref":"/c/eqio_s_r_o_/typ-organizace/3.json","typOrganizace@showAs":"PODNIKATELIA: Podnikatelia","mena":"code:EUR","mena@ref":"/c/eqio_s_r_o_/mena/6.json","mena@showAs":"EUR: Euro","tdObchodFav":"","tdObchodFavZal":"","tdObchodFap":"","tdObchodSklPri":"","tdObchodSklVyd":"","tdObchodNav":"","tdObchodObp":"","tdObchodObpEdi":"","tdObchodPpv":"","tdObchodNap":"","tdObchodObv":"","tdFavZalohovyDanDokl":"code:ZDD","tdFavZalohovyDanDokl@ref":"/c/eqio_s_r_o_/typ-faktury-vydane/8.json","tdFavZalohovyDanDokl@showAs":"ZDD: Zálohový daňový doklad","tdFapZalohovyDanDokl":"code:ZDD","tdFapZalohovyDanDokl@ref":"/c/eqio_s_r_o_/typ-faktury-prijate/12.json","tdFapZalohovyDanDokl@showAs":"ZDD: Zálohový daňový doklad","tdFapEdi":"","tdSklEdi":"","tdKurzovyRozdilNaklad":"code:KUR.ROZ.ZTRÁTA","tdKurzovyRozdilNaklad@ref":"/c/eqio_s_r_o_/typ-interniho-dokladu/17.json","tdKurzovyRozdilNaklad@showAs":"KUR.ROZ.ZTRÁTA: Účtovanie kurzových rozdielu - ztráta","tdKurzovyRozdilVynos":"code:KUR.ROZ.ZISK","tdKurzovyRozdilVynos@ref":"/c/eqio_s_r_o_/typ-interniho-dokladu/18.json","tdKurzovyRozdilVynos@showAs":"KUR.ROZ.ZISK: Účtovanie kurzových rozdielu - výnos","tdZbytekNaklad":"code:ZBYTEK NÁKLAD","tdZbytekNaklad@ref":"/c/eqio_s_r_o_/typ-interniho-dokladu/19.json","tdZbytekNaklad@showAs":"ZBYTEK NÁKLAD: Zúčtovanie zbytku úhrady - ztráta","tdZbytekVynos":"code:ZBYTEK VÝNOS","tdZbytekVynos@ref":"/c/eqio_s_r_o_/typ-interniho-dokladu/20.json","tdZbytekVynos@showAs":"ZBYTEK VÝNOS: Zúčtovanie zbytku úhrady - výnos","tdPreplatekPhl":"","tdPreplatekZav":"","tdEpGeneracePokladnichDokl":"","tdEpGeneraceVydejekZeSkladu":"","stat":"code:SK","stat@ref":"/c/eqio_s_r_o_/stat/152.json","stat@showAs":"Slovenská republika","statFakturacniAdresy":"","statPostovniAdresy":"","region":"","regionFakturacniAdresy":"","regionPostovniAdresy":"","menaDual":"","ucetZaokrNaklad":"","ucetZaokrVynos":"","ucetKrOdpoctuNaklad":"code:563001","ucetKrOdpoctuNaklad@ref":"/c/eqio_s_r_o_/ucet/287.json","ucetKrOdpoctuNaklad@showAs":"563001: Kurzové straty","ucetKrOdpoctuVynos":"code:663001","ucetKrOdpoctuVynos@ref":"/c/eqio_s_r_o_/ucet/294.json","ucetKrOdpoctuVynos@showAs":"663001: Kurzové zisky","finUrad":"","tdBanPrijem":"code:STANDARD","tdBanPrijem@ref":"/c/eqio_s_r_o_/typ-banka/4.json","tdBanPrijem@showAs":"STANDARD: Štandardný bankovní pohyb","tdBanVydej":"code:STANDARD","tdBanVydej@ref":"/c/eqio_s_r_o_/typ-banka/4.json","tdBanVydej@showAs":"STANDARD: Štandardný bankovní pohyb","seqDefProduct":"","mzdTdIntCestNadLim":"","mzdTdIntStravPausNadLim":"","mzdTdIntHomeofficeDoLim":"","mzdTdIntHomeofficeNadLim":"","mzdTdSrazkaStrav":"","mzdTdStravenka":"","mzdTuoStravZam":"","mzdTuoStravFirDoLim":"","mzdTuoStravFirNadLim":"","mzdTdIntPrispevky":"","mzdTdZavPrispevky":"","taxTdDanZav":"code:ZÁV. DAŇ PO SPLAT.","taxTdDanZav@ref":"/c/eqio_s_r_o_/typ-uplatneni-dane-zavazku/31.json","taxTdDanZav@showAs":"ZÁV. DAŇ PO SPLAT.: Daň po splatnosti - záväzky","tdOsUpravaPrijem":"code:POM. DOKL. DPH","tdOsUpravaPrijem@ref":"/c/eqio_s_r_o_/typ-pohledavky/29.json","tdOsUpravaPrijem@showAs":"POM. DOKL. DPH: Pomocný doklad pre DPH","tdOsUpravaVydej":"code:POM. DOKL. DPH","tdOsUpravaVydej@ref":"/c/eqio_s_r_o_/typ-zavazku/30.json","tdOsUpravaVydej@showAs":"POM. DOKL. DPH: Pomocný doklad pre DPH"}]}},"headers":{"server":"nginx/1.22.1","date":"Wed, 22 Apr 2026 09:30:57 GMT","content-type":"application/json","content-length":"7327","connection":"close","cache-control":"private, max-age=0, no-cache","set-cookie":["lang=cs;Version=1;Comment=;Path=/;Max-Age=315360000"],"vary":"Accept, Accept-Encoding, User-Agent","via":"1.1.loadbal-4.c.flexibee.eu, 1.1 varnish (Varnish/7.1)","x-cacheable":"NO:Not Cacheable","x-backend":"flexibee_1","x-varnish":"695664778","age":"0","strict-transport-security":"max-age=63072000"},"statusCode":200}]