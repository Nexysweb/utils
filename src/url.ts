/**
 * get google maps address link
 * @param object with  street, zip, city, country
 * @return link
 */
export const getGoogleMapsAddressLink = (p: {
  street: any;
  zip: any;
  city: any;
  country: { id: number; name: string };
}) => {
  const urlAddress = encodeURIComponent(
    p.street + " " + p.zip + " " + p.city + " " + p.country.name
  );
  const url = "https://www.google.com/maps/?q=" + urlAddress;
  return url;
};

/**
 * takes an object and turns it into a query string
 * @param  e.g. {p1: a1, p2: a2, ...}
 * @return p1=a1&p2=a2&...
 */
export const paramsToString = (params: { [k: string]: any }): string =>
  Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");

/**
 * @param k1=v1,k2=v2, ...
 * @return { k1: v1, k2: v2 .. }
 */
export const deserialize = (str: string): { [k: string]: string } =>
  str.split(",").reduce((r, item) => {
    const arr = item.split("=");

    if (arr.length === 2) {
      const [key, value] = arr;

      return { ...r, [key]: value };
    } else return r;
  }, {});

/**
 * when a given url: `/foo/:myparam1/bar` replace `:myparam1` with content of `obj[myparam1]`
 * @param  url: original url
 * @param  obj: object containing the value of the params
 * @return url with substituted values
 */
export const replaceParams = (
  uri: string,
  params: { [k: string]: any },
  curly: boolean = false
) => {
  if (!params || !(typeof params === "object")) {
    return uri;
  }

  Object.entries(params).map(([key, value]: [string, any]) => {
    if (curly) {
      const regex = new RegExp(`\\$\\{${key}\\}`, "g");
      uri = uri.replace(regex, value);
    } else uri = uri.replace(`:${key}`, value);
  });

  return uri;
};

/**
 * "resolves" url
 * this is to aoid using the extra package `url`: https://www.npmjs.com/package/url: https://github.com/defunctzombie/node-url/blob/13a35bd35a2cdf3fbfa7ee9c6ed5b927a48d6821/url.js#L438
 * https://nodejs.org/api/url.html#url_url_resolve_from_to
 * @param  host
 * @param  path
 * @return full url
 */
export const resolve = (hostIn: string, pathIn: string): string | null => {
  // match host until trailing slash
  const re = /^(.*)\/[^\/]*$/;
  const hostMatch = hostIn.match(re);

  let host = hostMatch && hostMatch[1];
  if ((host === "http:/" || host === "https:/") && !hostIn.endsWith("/")) {
    host = hostIn;
  }

  // extract path
  const reSlash = /^\/{0,1}(.*)$/;
  const pathMatch = pathIn.match(reSlash);

  const path = pathMatch && pathMatch[1];

  if (host && path) {
    return `${host}/${path}`;
  } else return null;
};

/**
 * explode query string and extract params
 * https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 * @param  query string, can be obtained using: window.location.search
 * @return params object
 */
export const getQueryStringParams = (query: string) => {
  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split("&")
    .reduce((params: { [k: string]: any }, param: any) => {
      const arrSplit: string[] = param.split("=");
      const [key, value] = arrSplit;
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
      return params;
    }, {});
};

/**
 * encodeURI with more options
 * To be more stringent in adhering to RFC 3986 (which reserves !, ', (, ), and *), even though these characters have no formalized URI delimiting uses, the following can be safely used:
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 */
export const fixedEncodeURIComponent = (str: string) =>
  encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
    return "%" + c.charCodeAt(0).toString(16);
  });

/**
 * get query params and put result into Map
 * @https://stackoverflow.com/questions/35352638/react-how-to-get-parameter-value-from-query-string/37568368#37568368
 */
export const getQueryParams = (s?: string): Map<string, string> => {
  if (!s || typeof s !== "string" || s.length < 2) {
    return new Map();
  }

  const a: [string, string][] = s
    .substr(1) // remove `?`
    .split("&") // split by `&`
    .map((x) => {
      const a = x.split("=");
      return [a[0], a[1]];
    }); // split by `=`

  return new Map(a);
};
