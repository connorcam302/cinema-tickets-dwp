import TicketTypeProperties from './TicketTypeProperties.js'
import TicketTypeRequest from './TicketTypeRequest.js'
import logger from '../utils/logger.js'

/**
 * @class TicketRequestHandler
 * @description Handles ticket requests and calculates the price and seat count.
 */
export default class TicketRequestHandler {
  /**
   * @private
   * @static
   * @method #getSeatCount
   * @description Calculates the number of seats for a given ticket type and count.
   * @param {string} type - The type of the ticket.
   * @param {number} count - The number of tickets.
   * @returns {number} The number of seats.
   */
  static #getSeatCount(type, count) {
    return TicketTypeProperties.requiresSeat(type) ? count : 0
  }

  /**
   * @private
   * @static
   * @method #getPrice
   * @description Calculates the price for a given ticket type and count.
   * @param {string} type - The type of the ticket.
   * @param {number} count - The number of tickets.
   * @returns {number} The total price.
   */
  static #getPrice(type, count) {
    return count * TicketTypeProperties.getPrice(type)
  }

  /**
   * @static
   * @method handleRequest
   * @description Handles a ticket request and returns the total price and seat count.
   * @param {TicketTypeRequest} request - The ticket request.
   * @returns {{price: number, seatCount: number}} An object containing the total price and seat count.
   */
  static handleRequest(request) {
    logger.debug('Handling ticket request', request)
    if (!(request instanceof TicketTypeRequest)) {
      logger.error('Invalid request type')
      throw new TypeError('Request must be of type TicketTypeRequest.')
    }

    let price = this.#getPrice(request.getTicketType(), request.getNoOfTickets())
    let seatCount = this.#getSeatCount(request.getTicketType(), request.getNoOfTickets())

    logger.debug(`Ticket request handled successfully, price: ${price}, seatCount: ${seatCount}`)

    return {
      price,
      seatCount,
    }
  }
}
