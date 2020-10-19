/**
 * converts array buffer to base 64
 * https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
 * @param a: array buffer
 */
export const arrayBufferTo64 = (a: ArrayBuffer): string => {
  const b: Uint8Array = new Uint8Array(a);
  return btoa(b.reduce((data, byte) => data + String.fromCharCode(byte), ""));
};

/**
 * converts base64 to blob
 * https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @param content: base 64
 * @param type: content type
 * blob won't work with Node
 */
export const base64ToBlob = (
  content: string,
  type: string = "application/pdf"
): Blob => {
  // Split into two parts
  //const parts = base64Image.split(';base64,');

  // Hold the content type
  //const imageType = parts[0].split(':')[1];

  // Decode Base64 string
  const decodedData = window.atob(content);

  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length);

  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }

  // Return BLOB image after conversion
  return new Blob([uInt8Array], { type });
};

/**
 * A Blob() is almost a File() - it's just missing the two properties below which we will add
 * https://stackoverflow.com/a/53205768/1659569
 * @param blob
 * @param name: file name
 * @param lastModified: timestamp
 * blob won't work with Node
 */
export const blobToFile = (
  blob: Blob,
  name: string,
  lastModified = new Date().getTime()
): File =>
  new File([blob], name, {
    lastModified,
    type: blob.type,
  });
