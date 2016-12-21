/* global describe:false, it:false, afterEach:false */

var chai = this.chai || require('chai');
var assert = chai.assert;
var gMapsLoader = this['loadGoogleMapsApi'];

// Very basic testing ;)

describe('Loader', function () {
  afterEach(function () {
    delete window.google;
  });

  it('should load something', function (done) {
    gMapsLoader().then(function (result) {
      assert.isOk(window.google);
      assert.isOk(window.google.maps);
      assert.equal(result, window.google.maps);

      done();
    }).catch(function (err) {
      done(err);
    });
  });

});

