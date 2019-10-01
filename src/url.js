/**
 * get google maps address link
 * @param object with  street, zip, city, country
 * @return link
 */
export const getGoogleMapsAddressLink = ({ street, zip, city, country }) => {
  const urlAddress = encodeURIComponent(street + ' ' + zip + ' ' + city + ' ' + country.name);
  const url = 'https://www.google.com/maps/?q=' + urlAddress;
  return url;
}

/**
 * takes an object and turns it into a query string
 * @param  e.g. {p1: a1, p2: a2, ...}
 * @return p1=a1&p2=a2&...
 */
export const paramsToString = params => Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
