/* global describe:false, it:false, afterEach:false */

var chai = this.chai || require('chai');
var assert = chai.assert;
var gMapsLoader = this['loadGoogleMapsApi'];

// Very basic testing ;)

describe('Loader', function () {
  afterEach(function () {
    delete window.google;
  });

  it('should load', function () {
    gMapsLoader().then(function () {
      assert(window.google);
      assert(window.google.maps);
    }, function () {
      assert(false);
    });
  });

});

