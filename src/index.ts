import xml2js = require('xml2js');

import {successCallback, failCallback, parsedAddress, openLSResponse} from './interfaces';

export = function openLSParser (xml: string, onSuccess: successCallback, onFail: failCallback) {

    var parsePos = function (p: string) {
        var resp: number[] = [];

        p.split(' ').forEach(function(e: string) {
            resp.push(parseFloat(e))
        });

        return resp;
    };

    var parseAddress = function (a: any) {
        var resp: parsedAddress = {
            Point: {
                srsName: a.Point[0].$.srsName,
                pos: parsePos(a.Point[0].pos[0]._)
            },
            Country: a.Address[0].$.countryCode,
            Place: {

            },
            Depth: 'Country'
        };

        for (let place of a.Address[0].Place) {
            resp.Place[
                place.$.type
            ] = place._

            if (resp.Depth === 'Country') resp.Depth = place.$.type; 
        };

        if (a.Address[0].PostalCode) resp.PostalCode = a.Address[0].PostalCode[0];
        
        if (a.Address[0].StreetAddress) {
            resp.StreetAddress = {};
            resp.Depth = 'Street';

            if (a.Address[0].StreetAddress[0].Building) {
                resp.StreetAddress["Building"] = a.Address[0].StreetAddress[0].Building[0].$;
                resp.Depth = 'Building';
            };

            if (a.Address[0].StreetAddress[0].Street) resp.StreetAddress["Street"] = a.Address[0].StreetAddress[0].Street[0];
        };

        return resp;
    };

    xml2js.parseString(xml, 
    {
        tagNameProcessors: [(xml2js as any).processors.stripPrefix]
    },
    function (err: any, r: any) : void {
        if (err) {
            if (onFail) {
                onFail();
            };
        } else {
            if ('GeocodeResponseList' in r.GeocodeResponse) {
                var resp: openLSResponse = {};

                for (let address of r.GeocodeResponse.GeocodeResponseList[0].GeocodedAddress) {
                    let parsed: parsedAddress = parseAddress(address);
                    
                    if (!(parsed.Depth in resp)) {
                        resp[parsed.Depth] = [];
                    }

                    resp[parsed.Depth].push(parsed);
                };

                onSuccess(resp);
            } else {
                onSuccess({});
            };
        };
    });
};