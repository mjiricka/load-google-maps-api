;(function (root, factory) {  // eslint-disable-line
  // Making module available as AMS, CommonJS and for browser.
  /* eslint-disable no-undef */
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (function () { return factory(m) })
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root['loadGoogleMapsApi'] = factory()
  }
  /* eslint-enable no-undef */
}(this, function() {
  'use strict'
  // Start of module definition.

  function loader (opts) {
    opts = opts || {};

    var client = opts.client || loader.client;
    var key = opts.key || loader.key;
    var language = opts.language || loader.language;
    var libraries = opts.libraries || loader.libraries || [];
    var timeout = opts.timeout || loader.timeout || 10000;
    var version = opts.version || loader.version;

    var callbackName = '__googleMapsApiOnLoadCallback';

    return new window.Promise(function (resolve, reject) {
      // Exit if not running inside a browser.
      if (typeof window === 'undefined') {
        return reject(new Error('Can only load the Google Maps API in the browser'));
      }

      // Check whether API is already loaded.
      if (window.google && window.google.maps) {
        resolve(window.google.maps);
      } else {
        // Prepare the `script` tag to be inserted into the page.
        var scriptElement = document.createElement('script');
        var params = ['callback=' + callbackName];
        if (client) params.push('client=' + client);
        if (key) params.push('key=' + key);
        if (language) params.push('language=' + language);
        libraries = [].concat(libraries); // Ensure that `libraries` is an array
        if (libraries.length) params.push('libraries=' + libraries.join(','));
        if (version) params.push('v=' + version);
        scriptElement.src = 'https://maps.googleapis.com/maps/api/js?' + params.join('&');

        // Timeout if necessary.
        var timeoutId = null;
        if (timeout) {
          timeoutId = window.setTimeout(function () {
            window[callbackName] = function () {}; // Set the on load callback to a no-op.
            reject(new Error('Could not load the Google Maps API'));
          }, timeout);
        }

        // Hook up the on load callback.
        window[callbackName] = function () {
          if (timeoutId !== null) {
            window.clearTimeout(timeoutId);
          }
          resolve(window.google.maps);
          delete window[callbackName];
        };

        // Insert the `script` tag.
        document.body.appendChild(scriptElement);
      }
    });
  }

  return loader;
}));

