import { expect } from 'chai'
import { it, describe } from 'mocha'
import TicketTypeConfig from '../../../src/pairtest/lib/TicketTypeProperties.js'

describe('TicketTypeConfig', () => {
  describe('TYPES', () => {
    it('should define ADULT, CHILD, and INFANT ticket types', () => {
      expect(TicketTypeConfig.TYPES).to.have.keys(['ADULT', 'CHILD', 'INFANT'])
    })

    it('should have correct price, seat, and purchase alone rule for adult', () => {
      const adult = TicketTypeConfig.TYPES.ADULT
      expect(adult.price).to.equal(25)
      expect(adult.requiresSeat).to.be.true
      expect(adult.canPurchaseAlone).to.be.true
    })

    it('should have correct price, seat, and purchase alone rule for child', () => {
      const child = TicketTypeConfig.TYPES.CHILD
      expect(child.price).to.equal(15)
      expect(child.requiresSeat).to.be.true
      expect(child.canPurchaseAlone).to.be.false
    })

    it('should have correct price, seat, and purchase alone rule for infant', () => {
      const infant = TicketTypeConfig.TYPES.INFANT
      expect(infant.price).to.equal(0)
      expect(infant.requiresSeat).to.be.false
      expect(infant.canPurchaseAlone).to.be.false
    })
  })

  describe('getValidTypes', () => {
    it('should return an array of valid ticket types', () => {
      const validTypes = TicketTypeConfig.getValidTypes()
      expect(validTypes).to.be.an('array').that.includes('ADULT', 'CHILD', 'INFANT')
    })
  })

  describe('getPrice', () => {
    it('should return correct price for adult', () => {
      expect(TicketTypeConfig.getPrice('ADULT')).to.equal(25)
    })

    it('should return correct price for child', () => {
      expect(TicketTypeConfig.getPrice('CHILD')).to.equal(15)
    })

    it('should return correct price for infant', () => {
      expect(TicketTypeConfig.getPrice('INFANT')).to.equal(0)
    })

    it('should return 0 for invalid type', () => {
      expect(TicketTypeConfig.getPrice('INVALID')).to.equal(0)
    })
  })

  describe('requiresSeat', () => {
    it('should return true for adult', () => {
      expect(TicketTypeConfig.requiresSeat('ADULT')).to.be.true
    })

    it('should return true for child', () => {
      expect(TicketTypeConfig.requiresSeat('CHILD')).to.be.true
    })

    it('should return false for ', () => {
      expect(TicketTypeConfig.requiresSeat('INFANT')).to.be.false
    })

    it('should default to true for invalid type', () => {
      expect(TicketTypeConfig.requiresSeat('INVALID')).to.be.true
    })
  })

  describe('canPurchaseAlone', () => {
    it('should return true for adult', () => {
      expect(TicketTypeConfig.canPurchaseAlone('ADULT')).to.be.true
    })

    it('should return false for child', () => {
      expect(TicketTypeConfig.canPurchaseAlone('CHILD')).to.be.false
    })

    it('should return false for infant', () => {
      expect(TicketTypeConfig.canPurchaseAlone('INFANT')).to.be.false
    })

    it('should default to false for invalid type', () => {
      expect(TicketTypeConfig.canPurchaseAlone('INVALID')).to.be.false
    })
  })
})
