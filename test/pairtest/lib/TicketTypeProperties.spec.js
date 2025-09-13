import { expect } from 'chai'
import { it, describe } from 'mocha'
import TicketTypeProperties from '../../../src/pairtest/lib/TicketTypeProperties.js'

describe('TicketTypeProperties', () => {
  describe('TYPES', () => {
    it('should define ADULT, CHILD, and INFANT ticket types', () => {
      expect(TicketTypeProperties.TYPES).to.have.keys(['ADULT', 'CHILD', 'INFANT'])
    })

    it('should have correct price, seat, and purchase alone rule for adult', () => {
      const adult = TicketTypeProperties.TYPES.ADULT
      expect(adult.price).to.equal(25)
      expect(adult.requiresSeat).to.be.true
      expect(adult.canPurchaseAlone).to.be.true
    })

    it('should have correct price, seat, and purchase alone rule for child', () => {
      const child = TicketTypeProperties.TYPES.CHILD
      expect(child.price).to.equal(15)
      expect(child.requiresSeat).to.be.true
      expect(child.canPurchaseAlone).to.be.false
    })

    it('should have correct price, seat, and purchase alone rule for infant', () => {
      const infant = TicketTypeProperties.TYPES.INFANT
      expect(infant.price).to.equal(0)
      expect(infant.requiresSeat).to.be.false
      expect(infant.canPurchaseAlone).to.be.false
    })
  })

  describe('getValidTypes', () => {
    it('should return an array of valid ticket types', () => {
      const validTypes = TicketTypeProperties.getValidTypes()
      expect(validTypes).to.be.an('array').that.includes('ADULT', 'CHILD', 'INFANT')
    })
  })

  describe('getPrice', () => {
    it('should return correct price for adult', () => {
      expect(TicketTypeProperties.getPrice('ADULT')).to.equal(25)
    })

    it('should return correct price for child', () => {
      expect(TicketTypeProperties.getPrice('CHILD')).to.equal(15)
    })

    it('should return correct price for infant', () => {
      expect(TicketTypeProperties.getPrice('INFANT')).to.equal(0)
    })

    it('should return 0 for invalid type', () => {
      expect(TicketTypeProperties.getPrice('INVALID')).to.equal(0)
    })
  })

  describe('requiresSeat', () => {
    it('should return true for adult', () => {
      expect(TicketTypeProperties.requiresSeat('ADULT')).to.be.true
    })

    it('should return true for child', () => {
      expect(TicketTypeProperties.requiresSeat('CHILD')).to.be.true
    })

    it('should return false for ', () => {
      expect(TicketTypeProperties.requiresSeat('INFANT')).to.be.false
    })

    it('should default to true for invalid type', () => {
      expect(TicketTypeProperties.requiresSeat('INVALID')).to.be.true
    })
  })

  describe('canPurchaseAlone', () => {
    it('should return true for adult', () => {
      expect(TicketTypeProperties.canPurchaseAlone('ADULT')).to.be.true
    })

    it('should return false for child', () => {
      expect(TicketTypeProperties.canPurchaseAlone('CHILD')).to.be.false
    })

    it('should return false for infant', () => {
      expect(TicketTypeProperties.canPurchaseAlone('INFANT')).to.be.false
    })

    it('should default to false for invalid type', () => {
      expect(TicketTypeProperties.canPurchaseAlone('INVALID')).to.be.false
    })
  })
})
