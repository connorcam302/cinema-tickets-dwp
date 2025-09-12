/**
 * @class
 * @classdesc Manages the configuration and business logic for different ticket types.
 */
export default class TicketTypeConfig {
  /**
   * @typedef {Object} TicketType
   * @property {number} price - The price of the ticket type.
   * @property {boolean} requiresSeat - Indicates if the ticket type requires a physical seat.
   * @property {boolean} canPurchaseAlone - Indicates if a ticket of this type can be purchased without an accompanying adult.
   */

  /**
   * @type {Object.<string, TicketType>}
   * @description An object containing the configuration for each ticket type.
   */
  static TYPES = {
    ADULT: {
      price: 25,
      requiresSeat: true,
      canPurchaseAlone: true,
    },
    CHILD: {
      price: 15,
      requiresSeat: true,
      canPurchaseAlone: false,
    },
    INFANT: {
      price: 0,
      requiresSeat: false,
      canPurchaseAlone: false,
    },
  }

  /**
   * Gets an array of valid ticket type keys.
   * @returns {string[]} An array of ticket type keys (e.g., ['ADULT', 'CHILD', 'INFANT']).
   */
  static getValidTypes() {
    return Object.keys(this.TYPES)
  }

  /**
   * Gets the price for a given ticket type.
   * @param {string} ticketType - The type of the ticket (e.g., 'ADULT').
   * @returns {number} The price of the ticket type. Returns 0 if the ticket type is not found.
   */
  static getPrice(ticketType) {
    return this.TYPES[ticketType]?.price ?? 0
  }

  /**
   * Checks if a ticket type requires a physical seat.
   * @param {string} ticketType - The type of the ticket.
   * @returns {boolean} True if the ticket type requires a seat, otherwise false. Returns true by default for unknown types.
   */
  static requiresSeat(ticketType) {
    return this.TYPES[ticketType]?.requiresSeat ?? true
  }

  /**
   * Checks if a ticket type can be purchased without an accompanying adult.
   * @param {string} ticketType - The type of the ticket.
   * @returns {boolean} True if the ticket can be purchased alone, otherwise false. Returns false by default for unknown types.
   */
  static canPurchaseAlone(ticketType) {
    return this.TYPES[ticketType]?.canPurchaseAlone ?? false
  }
}
