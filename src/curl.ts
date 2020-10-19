type Method = "GET" | "POST";
type Headers = { [k: string]: string };

export interface Options {
  url: string;
  method?: Method;
  headers?: Headers;
  file?: string;
}

const getMethod = (m?: Method): string => {
  if (!m || m === "GET") {
    return "";
  }

  return "-X POST ";
};

const getHeaders = (h?: Headers, sep: string = ""): string => {
  if (!h) {
    return "";
  }

  return Object.keys(h)
    .map((k) => {
      return `-H "${k}: ${h[k]}" `;
    })
    .join(sep);
};

const getFile = (f?: string): string => {
  if (!f) {
    return "";
  }

  return `--data @${f} `;
};

export const curl = (options: Options, sep: string = "") => {
  const s: string = [
    getHeaders(options.headers, sep),
    getMethod(options.method),
    getFile(options.file),
    options.url,
  ].join(sep);

  return `curl ${s}`;
};
