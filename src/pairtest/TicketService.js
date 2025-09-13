import TicketTypeRequest from './lib/TicketTypeRequest.js'
import InvalidPurchaseException from './lib/InvalidPurchaseException.js'
import TicketBookingValidator from './lib/TicketBookingValidator.js'
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js'
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js'
import TicketRequestHandler from './lib/TicketRequestHandler.js'

/**
 * @class
 * @classdesc A service for handling the purchase of tickets, including validation, seat reservation, and payment processing.
 */
export default class TicketService {
  /**
   * @private
   * @type {TicketPaymentService}
   * @description An instance of the payment service.
   */
  #paymentService = new TicketPaymentService()

  /**
   * @private
   * @type {SeatReservationService}
   * @description An instance of the seat reservation service.
   */
  #seatReservationService = new SeatReservationService()

  /**
   * Should only have private methods other than the one below.
   */

  /**
   * Purchases tickets for a given account.
   *
   * @param {number} accountId The ID of the account making the purchase.
   * @param {...TicketTypeRequest} ticketTypeRequests A variable number of ticket type requests.
   * @returns {{totalSeatCount: number, totalPrice: number}} An object containing the total seat count and total price.
   * @throws {InvalidPurchaseException | TypeError} if TicketBookingValidator.validate() conditions are not met and throws an exception for the total seat count or total price is not greater than 0.
   */
  purchaseTickets(accountId, ...ticketTypeRequests) {
    TicketBookingValidator.validate(accountId, ticketTypeRequests)

    let totalPrice = 0
    let totalSeatCount = 0

    ticketTypeRequests.forEach((request) => {
      const { price, seatCount } = TicketRequestHandler.handleRequest(request)
      totalPrice += price
      totalSeatCount += seatCount
    })

    if (totalSeatCount > 0 && totalPrice > 0) {
      this.#seatReservationService.reserveSeat(accountId, totalSeatCount)
      this.#paymentService.makePayment(accountId, totalPrice)
    } else {
      if (totalSeatCount < 1) {
        throw new InvalidPurchaseException('Total seat count must be greater than 0.')
      }
      if (totalPrice < 1) {
        throw new InvalidPurchaseException('Total price must be greater than 0.')
      }
    }

    return {
      totalSeatCount,
      totalPrice,
    }
  }
}
