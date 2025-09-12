/**
 * @file This file contains the InvalidPurchaseException class.
 * @class
 * @classdesc Represents an error that occurs when an invalid purchase is attempted.
 * @extends {Error}
 */
export default class InvalidPurchaseException extends Error {
  /**
   * Creates an instance of InvalidPurchaseException.
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message)
    this.name = 'InvalidPurchaseException'
  }
}
