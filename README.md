OpenLS Goecode request parser
=============================

This utility parses OpenLS geocode request xml files into JavaScript Objects.

Usage
-----
Include the openLSParser in your script and pass a Geocoderesponse to it.

```javascript
var openLSParser = require("openls-geocode-parser");

openLSparser(
    '<xls:GeocodeResponse xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"> ... </xls:GeocodeResponse>',
    function onSuccess(geocodeResponse) {
        console.log(geocodeResponse);
    },
    function onFail() {
        console.log('Something went wrong!');
    }
);
```

The GeocodeResponse is categorized into different 'depths':
* Country
* CountrySubdivision
* Municipality
* MunicipalitySubdivision
* Street
* Building

A fully featured GeocodedAddress has the following structure:

```javascript
geocodeResponse = {
    Building?: [
            {
            Country: string,
            Depth: string (= Building)
            Place: {
                CountrySubdivision?: string,
                Municipality?: string,
                MunicipalitySubdivision?: string
            },
            Point: {
                srsName: string,
                pos: [number, number]
            },
            PostalCode?: string,
            StreetAddress? {
                Building?: {
                    number: number,
                    subdivision?: string
                },
                Street: string
            }
        },
        {
        ...
        },
        ...
    ],
    Street? [
        ...
    ],
    ...
}
```