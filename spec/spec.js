var openLSParser = require('../dist/index.js');

var xml = {
  empty: '<xls:GeocodeResponse xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"></xls:GeocodeResponse>',
  utrecht: '<xls:GeocodeResponse><xls:GeocodeResponseList numberOfGeocodedAddresses="3"><xls:GeocodedAddress><gml:Point srsName="EPSG:28992"><gml:pos dimension="2">140369.1157833045 456499.59682081686</gml:pos></gml:Point><xls:Address countryCode="NL"><xls:Place type="CountrySubdivision">Utrecht</xls:Place></xls:Address></xls:GeocodedAddress><xls:GeocodedAddress><gml:Point srsName="EPSG:28992"><gml:pos dimension="2">133587.24395979484 455921.52059895755</gml:pos></gml:Point><xls:Address countryCode="NL"><xls:Place type="Municipality">Utrecht</xls:Place><xls:Place type="CountrySubdivision">Utrecht</xls:Place></xls:Address></xls:GeocodedAddress><xls:GeocodedAddress><gml:Point srsName="EPSG:28992"><gml:pos dimension="2">134989.0816614484 455642.5133947888</gml:pos></gml:Point><xls:Address countryCode="NL"><xls:Place type="MunicipalitySubdivision">Utrecht</xls:Place><xls:Place type="Municipality">Utrecht</xls:Place><xls:Place type="CountrySubdivision">Utrecht</xls:Place></xls:Address></xls:GeocodedAddress></xls:GeocodeResponseList></xls:GeocodeResponse>',
  dam: '<xls:GeocodeResponse><xls:GeocodeResponseList numberOfGeocodedAddresses="1"><xls:GeocodedAddress><gml:Point srsName="EPSG:28992"><gml:pos dimension="2">121360.24396153846 487362.52730769233</gml:pos></gml:Point><xls:Address countryCode="NL"><xls:StreetAddress><xls:Street>Dam</xls:Street></xls:StreetAddress><xls:Place type="MunicipalitySubdivision">Amsterdam</xls:Place><xls:Place type="Municipality">Amsterdam</xls:Place><xls:Place type="CountrySubdivision">Noord-Holland</xls:Place></xls:Address></xls:GeocodedAddress></xls:GeocodeResponseList></xls:GeocodeResponse>',
  building: '<xls:GeocodeResponse><xls:GeocodeResponseList numberOfGeocodedAddresses="1"><xls:GeocodedAddress><gml:Point srsName="EPSG:28992"><gml:pos dimension="2">121394.0 487383.0</gml:pos></gml:Point><xls:Address countryCode="NL"><xls:StreetAddress><xls:Building number="1"/><xls:Street>Dam</xls:Street></xls:StreetAddress><xls:Place type="MunicipalitySubdivision">Amsterdam</xls:Place><xls:Place type="Municipality">Amsterdam</xls:Place><xls:Place type="CountrySubdivision">Noord-Holland</xls:Place><xls:PostalCode>1012JS</xls:PostalCode></xls:Address></xls:GeocodedAddress></xls:GeocodeResponseList></xls:GeocodeResponse>'
};

describe("openLSParser", function() {

  it("should parse empty geocode responses", function() {
    openLSParser(
      xml.empty,
      function(data) {
        expect(data).toEqual({});
      },
      function() {
        fail('onFail called!');
      }
    )
  });

  it("should parse to CountrySubdivision", function() {
    openLSParser(
      xml.utrecht,
      function(data) {
        expect(data.CountrySubdivision).toBeDefined();
        expect(data.CountrySubdivision.length).toBe(1);
      },
      function() {
        fail('onFail called!');
      }
    )
  });

  it("should parse to Municipality", function() {
    openLSParser(
      xml.utrecht,
      function(data) {
        expect(data.Municipality).toBeDefined();
        expect(data.Municipality.length).toBe(1);
      },
      function() {
        fail('onFail called!');
      }
    )
  });

  it("should parse to MunicipalitySubdivision", function() {
    openLSParser(
      xml.utrecht,
      function(data) {
        expect(data.MunicipalitySubdivision).toBeDefined();
        expect(data.MunicipalitySubdivision.length).toBe(1);
      },
      function() {
        fail('onFail called!');
      }
    )
  });

  it("should parse to Street", function() {
    openLSParser(
      xml.dam,
      function(data) {
        expect(data.Street).toBeDefined();
        expect(data.Street.length).toBe(1);
      },
      function() {
        fail('onFail called!');
      }
    )
  });

  it("should parse to Building", function() {
    openLSParser(
      xml.building,
      function(data) {
        expect(data.Building).toBeDefined();
        expect(data.Building.length).toBe(1);
      },
      function() {
        fail('onFail called!');
      }
    )
  });

  it("should parse postal codes", function() {
    openLSParser(
      xml.building,
      function(data) {
        expect(data.Building).toBeDefined();
        expect(data.Building[0]).toBeDefined();
        expect(data.Building[0].PostalCode).toBeDefined();
        expect(data.Building[0].PostalCode).toBe('1012JS');
      },
      function() {
        fail('onFail called!');
      }
    )
  });

  it("should parse srsname", function() {
    openLSParser(
      xml.building,
      function(data) {
        expect(data.Building).toBeDefined();
        expect(data.Building[0]).toBeDefined();
        expect(data.Building[0].Point.srsName).toBeDefined();
        expect(data.Building[0].Point.srsName).toBe('EPSG:28992');
      },
      function() {
        fail('onFail called!');
      }
    )
  });

  it("should parse point position", function() {
    openLSParser(
      xml.building,
      function(data) {
        expect(data.Building).toBeDefined();
        expect(data.Building[0]).toBeDefined();
        expect(data.Building[0].Point.pos).toBeDefined();
        expect(data.Building[0].Point.pos).toEqual([121394.0, 487383.0]);
      },
      function() {
        fail('onFail called!');
      }
    )
  });

});

