import InvalidPurchaseException from './InvalidPurchaseException.js'
import TicketTypeRequest from './TicketTypeRequest.js'
import logger from '../utils/logger.js'

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
    logger.debug(`Validating ticket request for accountId: ${accountId}`)
    logger.debug(`Tickets requested: ${ticketTypeRequests}`)
    if (!Number.isInteger(accountId) || accountId <= 0) {
      logger.error('Invalid accountId')
      throw new TypeError('Value must be an integer greater than 0.')
    }

    if (!Array.isArray(ticketTypeRequests)) {
      logger.error('ticketTypeRequests is not an array')
      throw new TypeError('Requests must be an array.')
    }

    if (ticketTypeRequests.length < 1) {
      logger.error('ticketTypeRequests is empty')
      throw new InvalidPurchaseException('Request array must not be empty.')
    }

    if (ticketTypeRequests.some((request) => !(request instanceof TicketTypeRequest))) {
      logger.error('ticketTypeRequests contains non-TicketTypeRequest items')
      throw new TypeError('Requests must all be an instance of TicketTypeRequest.')
    }

    if (!ticketTypeRequests.some((request) => request.canPurchaseAlone())) {
      logger.error('Request does not contain at least 1 member that can purchase alone')
      throw new InvalidPurchaseException(
        'Request must contain at least 1 member that can purchase alone.',
      )
    }

    const ticketCount = ticketTypeRequests.reduce(
      (sum, request) => sum + request.getNoOfTickets(),
      0,
    )
    if (ticketCount > 25) {
      logger.error(`Ticket count exceeds maximum of 25: ${ticketCount}`)
      throw new InvalidPurchaseException('Request can only consist of a maximum of 25 tickets.')
    }

    const requiresLapSeatingCount = ticketTypeRequests
      .filter((request) => !request.requiresSeat())
      .reduce((sum, request) => sum + request.getNoOfTickets(), 0)
    const allowsLapSeatingCount = ticketTypeRequests
      .filter((request) => request.allowsLapSeating())
      .reduce((sum, request) => sum + request.getNoOfTickets(), 0)

    if (requiresLapSeatingCount > allowsLapSeatingCount) {
      logger.error(
        `Ticket holders that require lap seating exceeded those that allow lap seating, requires lap seating: ${requiresLapSeatingCount}, allows lap seating: ${allowsLapSeatingCount}`,
      )
      throw new InvalidPurchaseException(
        'Request must have more ticket holders that allow lap seating than those who require lap seating',
      )
    }
    logger.debug('Ticket request validated successfully')
  }
}
