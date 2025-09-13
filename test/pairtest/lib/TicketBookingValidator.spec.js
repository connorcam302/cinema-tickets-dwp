import { it } from 'mocha'
import { describe } from 'mocha'
import { expect } from 'chai'
import TicketBookingValidator from '../../../src/pairtest/lib/TicketBookingValidator.js'
import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest.js'
import InvalidPurchaseException from '../../../src/pairtest/lib/InvalidPurchaseException.js'

describe('TicketBookingValidator', () => {
  describe('validate', () => {
    it('should not throw an error when all business rules are met.', () => {
      const adultTickets = new TicketTypeRequest('ADULT', 3)
      const childTickets = new TicketTypeRequest('CHILD', 2)
      const infantTickets = new TicketTypeRequest('INFANT', 1)

      expect(() =>
        TicketBookingValidator.validate(123, [adultTickets, childTickets, infantTickets]),
      ).to.not.throw()

      expect(() => TicketBookingValidator.validate(123, [adultTickets])).to.not.throw()
      expect(() =>
        TicketBookingValidator.validate(123, [adultTickets, childTickets]),
      ).to.not.throw()
      expect(() =>
        TicketBookingValidator.validate(123, [adultTickets, infantTickets]),
      ).to.not.throw()
    })

    it('should throw an error if accountId is not a positive integer.', () => {
      const invalidAccountIdTypes = ['INVALID ACCOUNT ID', 0, 12.34, -12, null, undefined, {}, []]
      const adultTickets = new TicketTypeRequest('ADULT', 3)
      const childTickets = new TicketTypeRequest('CHILD', 2)
      const infantTickets = new TicketTypeRequest('INFANT', 1)

      invalidAccountIdTypes.forEach((invalidAccountId) =>
        expect(() =>
          TicketBookingValidator.validate(invalidAccountId, [
            adultTickets,
            childTickets,
            infantTickets,
          ]),
        ).to.throw(TypeError),
      )
    })

    it('should throw an error if no tickets are requested.', () => {
      expect(() => TicketBookingValidator.validate(123, [])).to.throw(InvalidPurchaseException)
    })

    it('should throw an error if ticket requests is not an array of TicketTypeRequest.', () => {
      const invalidRequestTypes = ['INVALID REQUEST', 0, 12.34, {}, [123, 456, 789]]

      invalidRequestTypes.forEach((arr) => {
        expect(() => TicketBookingValidator.validate(123, arr)).to.throw(TypeError)
      })
    })

    it('should throw an error if more than 25 tickets are attempted to be bought.', () => {
      const adultTickets = new TicketTypeRequest('ADULT', 15)
      const childTickets = new TicketTypeRequest('CHILD', 10)
      const infantTickets = new TicketTypeRequest('INFANT', 5)

      expect(() =>
        TicketBookingValidator.validate(123, [adultTickets, childTickets, infantTickets]),
      ).to.throw(InvalidPurchaseException)
    })

    it('should throw an error if there are more people that require lap seating than can provide.', () => {
      const adultTickets = new TicketTypeRequest('ADULT', 1)
      const infantTickets = new TicketTypeRequest('INFANT', 2)

      expect(() => TicketBookingValidator.validate(123, [adultTickets, infantTickets])).to.throw(
        InvalidPurchaseException,
      )
    })

    it('should throw an error if no one in the booking list can book alone.', () => {
      const childTickets = new TicketTypeRequest('CHILD', 10)
      const infantTickets = new TicketTypeRequest('INFANT', 5)

      expect(() => TicketBookingValidator.validate(123, [childTickets, infantTickets])).to.throw(
        InvalidPurchaseException,
      )
    })
  })
})
