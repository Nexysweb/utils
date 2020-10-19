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
