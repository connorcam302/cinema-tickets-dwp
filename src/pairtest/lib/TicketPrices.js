/**
 * @class
 * @classdesc Utility class for obtaining ticket prices based on price
 */

export default class TicketPrices {
  /**
   * @private
   * @static
   * @type
   * @type {Object.<string, number>}
   * @description Object to map ticket types against prices.
   */
  static #Prices = {
    ADULT: 25,
    CHILD: 15,
    INFANT: 0,
  }

  /**
   * Gets price of ticket based on the type of ticket
   * @static
   * @param {('ADULT'|'CHILD'|'INFANT')} type - Type of the ticket
   * @returns {number} The price of the ticket
   */
  static getPrice(type) {
    if (!this.#Prices.hasOwnProperty(type)) {
      throw new TypeError(
        `type must be ${Object.keys(this.#Prices).slice(0, -1).join(', ')}, or ${Object.keys(this.#Prices).slice(-1)}`,
      )
    }
    return this.#Prices[type]
  }
}
