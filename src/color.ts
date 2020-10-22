/**
 * hex to rgba
 * @see https://www.w3schools.com/css/css3_colors.asp
 * @param  hex
 * @param   alpha (default = 1, fully opaque)
 * @return rgba css command
 */
export const toRGBA = (hex: string, alpha: number = 1): string => {
  return `rgba(${parseInt(hex.substring(1, 3), 16)},${parseInt(
    hex.substring(3, 5),
    16
  )},${parseInt(hex.substring(5, 7), 16)},${alpha})`;
};

/**
 * generate a random color
 * taken from : https://stackoverflow.com/questions/1484506/random-color-generator
 * old: taken from https://css-tricks.com/snippets/javascript/random-hex-color/
 */

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
