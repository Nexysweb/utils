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