/**
 * error class to manage exceptions at service level
 */
export default class Error {
  constructor(message, statusCode) {
    this.message = message || null;
    this.statusCode = statusCode || 400;

    this.isError = true;
  }
}

/**
 * check whether of type error
 * @param any  input
 * @return boolean
 */
export const isError = e => e instanceof Error;
