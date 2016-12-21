# load-google-maps-api

This is a fork of https://github.com/yuanqing/load-google-maps-api, following changes were made:

 * Removed ES6 features, so no Babel is needed.
 * Added support for CommonJS, AMD and browser (as `window.loadGoogleMapsApi`).
 * Added check whether API is already loaded (it writes warning into console if `google.maps` is already loaded).
 * Added support for setting options globally.
 * Parameter `v` renamed to `version`.
 
Consider to use some Promise polyfill with this plugin, like https://github.com/taylorhakes/promise-polyfill.
 
*Original documentation with some minor changes follows.*


## About

A thin, [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)-returning helper for loading the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/). Works only in browser.


## Usage

```js
var loadGoogleMapsAPI = require('load-google-maps-api');

loadGoogleMapsAPI().then(function (googleMaps) {
  console.log(googleMaps); //=> Object { Animation: Object, ...
}).catch(function (err) {
  console.error(err);
});
```

## Why

Without this module, you would need to specify a named *global* callback, and pass said callback&rsquo;s name as a parameter in the `script` tag&rsquo;s `src`. For example:

```html
<script>
window.googleMapsOnLoad = function () {
  // `google.maps` available here
}
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?callback=googleMapsOnLoad"></script>
```

This module abstracts this ceremony away, and fits better with [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/).

## API

```js
var loadGoogleMapsAPI = require('load-google-maps-api');
```

### loadGoogleMapsAPI([opts])

Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). (See [Usage](#usage).)

- **Fulfilled** if load was successful. The fulfilled callback is passed the `google.maps` object.
- **Rejected** if we weren&rsquo;t able to load the Google Maps API after `opts.timeout`.

`opts` is an optional object literal:

  Key | Description | Default
  :--|:--|:--
  `client` | [Client ID](https://developers.google.com/maps/documentation/javascript/get-api-key#specify-a-client-id-when-loading-the-api) | `undefined`
  `key` | [Your API key](https://developers.google.com/maps/documentation/javascript/get-api-key#specify-a-key-when-loading-the-api) | `undefined`
  `language` | [Language](https://developers.google.com/maps/documentation/javascript/examples/map-rtl) | `undefined`
  `libraries` | [Supplemental libraries to load](https://developers.google.com/maps/documentation/javascript/libraries) | `[]`
  `timeout` | Time in milliseconds before rejecting the promise | `10000`
  `version` | [API version](https://developers.google.com/maps/documentation/javascript/versions) | `undefined`


### Setting global options

Default parameters can be set globally for a whole application. For example:

```js
var loadGoogleMapsAPI = require('load-google-maps-api');

loadGoogleMapsAPI.key = 'xxxxxxxxxxxx';
loadGoogleMapsAPI.language = 'cs';
```


## Installation

Install via [npm](https://npmjs.com):

```
$ npm i --save load-google-maps-api
```

## License

[MIT](LICENSE.md)
