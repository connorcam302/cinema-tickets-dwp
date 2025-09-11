import { it } from 'mocha'
import { describe } from 'mocha'
import { expect } from 'chai'
import TicketRequestHandler from '../../../src/pairtest/lib/TicketRequestHandler.js'
import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest.js'

describe('TicketRequestHandler', () => {
  describe('handleRequest', () => {
    describe('Invalid Request', () => {
      it('should throw an error if request is not of type TicketTypeRequest', () => {
        const invalidRequestTypes = ['INVALID REQUEST', 123, 12.34, null, undefined, {}, []]
        invalidRequestTypes.forEach((invalidRequest) =>
          expect(() => TicketRequestHandler.handleRequest(invalidRequest)).to.throw(TypeError),
        )
      })
    })
    describe('Valid Request', () => {
      it('should allocate 5 seats with a price of 125 for 5 adults', () => {
        const ticketRequest = new TicketTypeRequest('ADULT', 5)
        expect(TicketRequestHandler.handleRequest(ticketRequest)).to.deep.equal({
          price: 125,
          seatCount: 5,
        })
      })

      it('should allocate 3 seats with a price of 45 for 3 children', () => {
        const ticketRequest = new TicketTypeRequest('CHILD', 3)
        expect(TicketRequestHandler.handleRequest(ticketRequest)).to.deep.equal({
          price: 45,
          seatCount: 3,
        })
      })

      it('should allocate 0 seats and a price of 0 for 2 infants', () => {
        const ticketRequest = new TicketTypeRequest('INFANT', 2)
        expect(TicketRequestHandler.handleRequest(ticketRequest)).to.deep.equal({
          price: 0,
          seatCount: 0,
        })
      })
    })
  })
})
