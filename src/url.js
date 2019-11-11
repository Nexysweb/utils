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

/**
 * @param k1=v1,k2=v2, ...
 * @return { k1: v1, k2: v2 .. }
 */
export const deserialize = str => str.split(',').reduce((r, item) => {
  const arr = item.split('=');

  if (arr.length === 2) {
    const [ key, value] = arr;

    return  {...r, [key]: value};
  } else return r;
}, {});

/**
 * when a given url: `/foo/:myparam1/bar` replace `:myparam1` with content of `obj[myparam1]`
 * @param  url: original url
 * @param  obj: object containing the value of the params
 * @return url with substituted values
 */
export const replaceParams = (uri, params, curly=false) => {
  if (!params || !(typeof params === 'object')) {
    return uri;
  }

  Object.entries(params).forEach(([key, value]) => {
    if (curly) {
      const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
      uri = uri.replace(regex, value);
    } else uri = uri.replace(`:${key}`, value);
  });

  return uri;
};

/**
 * "resolves" url
 * this is to aoid using the extra package `url`: https://www.npmjs.com/package/url: https://github.com/defunctzombie/node-url/blob/13a35bd35a2cdf3fbfa7ee9c6ed5b927a48d6821/url.js#L438
 * @param  host
 * @param  path
 * @return full url
 */
export const resolve = (host, path) => {
  return host + path;
}