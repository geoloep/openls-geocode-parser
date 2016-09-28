"use strict";
var xml2js = require('xml2js');
module.exports = function openLSParser(xml, onSuccess, onFail) {
    var parsePos = function (p) {
        var resp = [];
        p.split(' ').forEach(function (e) {
            resp.push(parseFloat(e));
        });
        return resp;
    };
    var parseAddress = function (a) {
        var resp = {
            Point: {
                srsName: a.Point[0].$.srsName,
                pos: parsePos(a.Point[0].pos[0]._)
            },
            Country: a.Address[0].$.countryCode,
            Place: {},
            Depth: 'Country'
        };
        for (var i = 0; i < a.Address[0].Place.length; i++) {
            resp.Place[a.Address[0].Place[i].$.type] = a.Address[0].Place[i]._;
            if (resp.Depth === 'Country')
                resp.Depth = a.Address[0].Place[i].$.type;
        }
        ;
        if (a.Address[0].PostalCode)
            resp.PostalCode = a.Address[0].PostalCode[0];
        if (a.Address[0].StreetAddress) {
            resp.StreetAddress = {};
            resp.Depth = 'Street';
            if (a.Address[0].StreetAddress[0].Building) {
                resp.StreetAddress["Building"] = a.Address[0].StreetAddress[0].Building[0].$;
                resp.Depth = 'Building';
            }
            ;
            if (a.Address[0].StreetAddress[0].Street)
                resp.StreetAddress["Street"] = a.Address[0].StreetAddress[0].Street[0];
        }
        ;
        return resp;
    };
    xml2js.parseString(xml, {
        tagNameProcessors: [xml2js.processors.stripPrefix]
    }, function (err, r) {
        if (err) {
            if (onFail) {
                onFail();
            }
            ;
        }
        else {
            if (r.GeocodeResponse.GeocodeResponseList) {
                var resp = {};
                for (var _i = 0, _a = r.GeocodeResponse.GeocodeResponseList[0].GeocodedAddress; _i < _a.length; _i++) {
                    var address = _a[_i];
                    var parsed = parseAddress(address);
                    if (!(parsed.Depth in resp)) {
                        resp[parsed.Depth] = [];
                    }
                    resp[parsed.Depth].push(parsed);
                }
                ;
                onSuccess(resp);
            }
            else {
                onFail();
            }
            ;
        }
        ;
    });
};
