"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paramsToString = exports.getGoogleMapsAddressLink = void 0;

/**
 * get google maps address link
 * @param object with  street, zip, city, country
 * @return link
 */
var getGoogleMapsAddressLink = function getGoogleMapsAddressLink(_ref) {
  var street = _ref.street,
      zip = _ref.zip,
      city = _ref.city,
      country = _ref.country;
  var urlAddress = encodeURIComponent(street + ' ' + zip + ' ' + city + ' ' + country.name);
  var url = 'https://www.google.com/maps/?q=' + urlAddress;
  return url;
};
/**
 * takes an object and turns it into a query string
 * @param  e.g. {p1: a1, p2: a2, ...}
 * @return p1=a1&p2=a2&...
 */


exports.getGoogleMapsAddressLink = getGoogleMapsAddressLink;

var paramsToString = function paramsToString(params) {
  return Object.keys(params).map(function (key) {
    return key + '=' + encodeURIComponent(params[key]);
  }).join('&');
};

exports.paramsToString = paramsToString;