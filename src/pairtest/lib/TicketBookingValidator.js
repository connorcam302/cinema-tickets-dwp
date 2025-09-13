import InvalidPurchaseException from './InvalidPurchaseException.js'
import TicketTypeRequest from './TicketTypeRequest.js'

/**
 * @class TicketBookingValidator
 * @description Validates ticket requests.
 */
export default class TicketBookingValidator {
  /**
   * @static
   * @method validate
   * @description Validates an array of ticket requests.
   * @param {TicketTypeRequest[]} ticketTypeRequests - The ticket requests to validate.
   * @throws {InvalidPurchaseException | TypeError} If any of the requests are invalid.
   */
  static validate(accountId, ticketTypeRequests) {
    if (!Number.isInteger(accountId) || accountId <= 0) {
      throw new TypeError('Value must be an integer greater than 0.')
    }

    if (!Array.isArray(ticketTypeRequests)) {
      throw new TypeError('Requests must be an array.')
    }

    if (ticketTypeRequests.length < 1) {
      throw new InvalidPurchaseException('Request array must not be empty.')
    }

    if (ticketTypeRequests.some((request) => !(request instanceof TicketTypeRequest))) {
      throw new TypeError('Requests must all be an instance of TicketTypeRequest.')
    }

    if (!ticketTypeRequests.some((request) => request.canPurchaseAlone())) {
      throw new InvalidPurchaseException(
        'Request must contain at least 1 member that can purchase alone.',
      )
    }

    const ticketCount = ticketTypeRequests.reduce(
      (sum, request) => sum + request.getNoOfTickets(),
      0,
    )
    if (ticketCount > 25) {
      throw new InvalidPurchaseException('Request can only consist of a maximum of 25 tickets.')
    }

    const requiresLapSeatingCount = ticketTypeRequests
      .filter((request) => !request.requiresSeat())
      .reduce((sum, request) => sum + request.getNoOfTickets(), 0)
    const allowsLapSeatingCount = ticketTypeRequests
      .filter((request) => request.allowsLapSeating())
      .reduce((sum, request) => sum + request.getNoOfTickets(), 0)

    if (requiresLapSeatingCount > allowsLapSeatingCount) {
      throw new InvalidPurchaseException(
        'Request must have more ticket holders that allow lap seating than those who require lap seating',
      )
    }
  }
}
