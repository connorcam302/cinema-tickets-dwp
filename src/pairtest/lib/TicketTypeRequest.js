/**
 * Immutable Object.
 */

import TicketTypeProperties from './TicketTypeProperties.js'
import logger from '../utils/logger.js'

export default class TicketTypeRequest {
  #type

  #noOfTickets

  constructor(type, noOfTickets) {
    logger.debug(`Creating new TicketTypeRequest: ${type}, ${noOfTickets}`)
    const validTypes = TicketTypeProperties.getValidTypes()
    if (!validTypes.includes(type)) {
      logger.error(`Invalid ticket type: ${type}`)
      throw new TypeError(
        `type must be ${validTypes.slice(0, -1).join(', ')}, or ${validTypes.slice(-1)}`,
      )
    }

    if (!Number.isInteger(noOfTickets)) {
      logger.error(`Invalid number of tickets: ${noOfTickets}`)
      throw new TypeError('noOfTickets must be an integer')
    }

    this.#type = type
    this.#noOfTickets = noOfTickets
    logger.debug('TicketTypeRequest created successfully')
  }

  getNoOfTickets() {
    return this.#noOfTickets
  }

  getTicketType() {
    return this.#type
  }

  /**
   * Get the unit price for this ticket type.
   *
   * @returns {number} The price of a single ticket.
   */
  getPrice() {
    return TicketTypeProperties.getPrice(this.#type)
  }

  /**
   * Check whether this ticket type requires a seat.
   *
   * @returns {boolean} True if the ticket type requires a seat, false otherwise.
   */
  requiresSeat() {
    return TicketTypeProperties.requiresSeat(this.#type)
  }

  /**
   * Check whether this ticket type can be purchased without an accompanying adult.
   *
   * @returns {boolean} True if this ticket type can be purchased alone, false otherwise.
   */
  canPurchaseAlone() {
    return TicketTypeProperties.canPurchaseAlone(this.#type)
  }

  /**
   * Get the total price for all tickets in this request.
   *
   * @returns {number} The total price (unit price * number of tickets).
   */
  getTotalPrice() {
    return this.getNoOfTickets() * this.getPrice()
  }

  /**
   * Checks if a ticket type can be allows for a ticket holder who does not require a seat to sit on their lap.
   * @returns {boolean} True if the ticket holder allows someone to sit on their lap, otherwise false.
   */
  allowsLapSeating() {
    return TicketTypeProperties.allowsLapSeating(this.#type)
  }
}
