import { it } from 'mocha'
import { describe } from 'mocha'
import sinon from 'sinon'
import { expect } from 'chai'
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest.js'
import TicketService from '../../src/pairtest/TicketService.js'
import SeatReservationService from '../../src/thirdparty/seatbooking/SeatReservationService.js'
import TicketPaymentService from '../../src/thirdparty/paymentgateway/TicketPaymentService.js'
import TicketBookingValidator from '../../src/pairtest/lib/TicketBookingValidator.js'
import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException.js'
import TicketRequestHandler from '../../src/pairtest/lib/TicketRequestHandler.js'

describe('TicketService', () => {
  describe('purchaseTickets', () => {
    let service

    beforeEach(() => {
      service = new TicketService()
    })

    afterEach(() => {
      sinon.restore()
    })

    it('should reach out to ticket payment service', () => {
      const ticketTypeRequests = [
        new TicketTypeRequest('ADULT', 1),
        new TicketTypeRequest('CHILD', 2),
        new TicketTypeRequest('INFANT', 1),
      ]

      let paymentSpy = sinon.stub(TicketPaymentService.prototype, 'makePayment').callsFake(() => {})

      service.purchaseTickets(123, ...ticketTypeRequests)

      expect(paymentSpy.calledOnce).to.be.true
    })

    it('should reach out to seat reservation service', () => {
      const ticketTypeRequests = [
        new TicketTypeRequest('ADULT', 1),
        new TicketTypeRequest('CHILD', 2),
        new TicketTypeRequest('INFANT', 1),
      ]

      let seatSpy = sinon.stub(SeatReservationService.prototype, 'reserveSeat').callsFake(() => {})

      service.purchaseTickets(123, ...ticketTypeRequests)

      expect(seatSpy.calledOnce).to.be.true
    })

    it('should call the validator', () => {
      const ticketTypeRequests = [
        new TicketTypeRequest('ADULT', 1),
        new TicketTypeRequest('CHILD', 2),
        new TicketTypeRequest('INFANT', 1),
      ]

      let validatorSpy = sinon.stub(TicketBookingValidator, 'validate').callsFake(() => {})

      service.purchaseTickets(123, ...ticketTypeRequests)

      expect(validatorSpy.calledOnce).to.be.true
    })

    it('should throw an error if validator fails and no seats are requested', () => {
      const ticketTypeRequests = []

      expect(() => service.purchaseTickets(123, ...ticketTypeRequests)).to.throw(
        InvalidPurchaseException,
      )
    })

    it('should throw an error if validator fails and price is less than 1', () => {
      const ticketTypeRequests = []

      expect(() => service.purchaseTickets(123, ...ticketTypeRequests)).to.throw(
        InvalidPurchaseException,
      )
    })

    it('should allow the purchase of a single adult ticket', () => {
      const ticketTypeRequests = [new TicketTypeRequest('ADULT', 1)]

      expect(() => service.purchaseTickets(123, ...ticketTypeRequests)).to.not.throw
    })
    it('should allow the purchase of multiple adult tickets', () => {
      const ticketTypeRequests = [new TicketTypeRequest('ADULT', 5)]

      expect(() => service.purchaseTickets(123, ...ticketTypeRequests)).to.not.throw
    })

    it('should allow the purchase of a single child ticket with an adult', () => {
      const ticketTypeRequests = [
        new TicketTypeRequest('CHILD', 1),
        new TicketTypeRequest('ADULT', 1),
      ]

      expect(() => service.purchaseTickets(123, ...ticketTypeRequests)).to.not.throw
    })

    it('should allow the purchase of multiple child tickets with an adult', () => {
      const ticketTypeRequests = [
        new TicketTypeRequest('CHILD', 5),
        new TicketTypeRequest('ADULT', 1),
      ]

      expect(() => service.purchaseTickets(123, ...ticketTypeRequests)).to.not.throw
    })

    it('should throw an error if no can purchase alone ticket is requested', () => {
      const ticketTypeRequests = [new TicketTypeRequest('CHILD', 1)]

      expect(() => service.purchaseTickets(123, ...ticketTypeRequests)).to.throw(
        InvalidPurchaseException,
      )
    })

    it('should allow the purchase of a single infant ticket with an adult', () => {
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 1),
        new TicketTypeRequest('ADULT', 1),
      ]

      expect(() => service.purchaseTickets(123, ...ticketTypeRequests)).to.not.throw
    })

    it('should throw an error if more required lap seating than allowed lap seating', () => {
      const ticketTypeRequests = [
        new TicketTypeRequest('INFANT', 5),
        new TicketTypeRequest('ADULT', 1),
      ]

      expect(() => service.purchaseTickets(123, ...ticketTypeRequests)).to.throw(
        InvalidPurchaseException,
      )
    })
  })
})
