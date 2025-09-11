import { it } from 'mocha'
import { describe } from 'mocha'
import { expect } from 'chai'
import TicketPrices from '../../../src/pairtest/lib/TicketPrices.js'

describe('TicketPrices', () => {
  describe('Getting prices', () => {
    describe('Valid ticket type', () => {
      it('should get the correct price for the given ticket type', () => {
        const validTicketTypes = {
          ADULT: 25,
          CHILD: 15,
          INFANT: 0,
        }

        Object.entries(validTicketTypes).forEach(([type, price]) => {
          expect(TicketPrices.getPrice(type)).to.equal(price)
        })
      })
    })

    describe('Invalid ticket type', () => {
      it('should throw an error if the ticket type is not valid', () => {
        const invalidTicketTypes = ['INVALID ACCOUNT ID', 12.34, null, undefined, {}, []]
        invalidTicketTypes.forEach((ticketType) =>
          expect(() => TicketPrices.getPrice(ticketType)).to.throw(TypeError),
        )
      })
    })
  })
})

