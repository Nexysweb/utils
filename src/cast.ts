// cast different types to another type
export const toDecimal = (s:string):Number => {
  const r = parseFloat(s); // better to use Number?

  if (isNaN(r)) {
    return null;
  }

  return r;
};

export const toInt = (s:string):Number => {
  try {
    return parseInt(s);
  } catch (err) {
    return null;
  }
};

export const toDate = (s:string):Date => {
  try {
    return new Date(s);
  } catch {
    return null;
  }
};
