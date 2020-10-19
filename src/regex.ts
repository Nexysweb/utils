const isValid = (regex: string, str: string): boolean => {
  const re = new RegExp(regex, "g");
  const t = str.match(re);

  return Array.isArray(t);
};

const getMatches = (
  regex: string,
  str: string,
  { flags = "g", depth = 0 } = {}
) => {
  const re = new RegExp(regex, flags);

  // TODO: utils.match(str, regexp, options='g')
  let match = null;
  const matches = [];
  do {
    match = re.exec(str);
    if (match) {
      matches.push(match[depth]);
    }
  } while (match != null);

  return matches;
};

export { isValid, getMatches };
