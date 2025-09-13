import { it } from "mocha";
import { describe } from "mocha";
import TicketTypeRequest from "../../../src/pairtest/lib/TicketTypeRequest.js";
import { expect } from "chai";


describe('TicketTypeRequest', () => {
	describe('Requesting Tickets', () => {
		describe('Invalid Request', () => {
			it('should throw an error due to invalid type', () => {
				expect(() => new TicketTypeRequest('INVALID TYPE', 1)).to.throw(TypeError)
			})
			it('should throw an error if ticket amount is not an integer', () => {
				const invalidTicketAmounts = ['INVALID ACCOUNT ID', 12.34, null, undefined, {}, []]
				invalidTicketAmounts.forEach((ticketAmount) => expect(()=> new TicketTypeRequest('ADULT', ticketAmount)).to.throw(TypeError))
			})
		})
		describe('Adult Tickets', () => {
			it('should allow the requesting of a single adult ticket', () => {
				const tickets = new TicketTypeRequest('ADULT', 1)

				expect(tickets.getTicketType()).to.equal('ADULT')
				expect(tickets.getNoOfTickets()).to.equal(1)
			})
			it('should allow the requesting of multiple adult tickets', () => {
				const tickets = new TicketTypeRequest('ADULT', 5)

				expect(tickets.getTicketType()).to.equal('ADULT')
				expect(tickets.getNoOfTickets()).to.equal(5)
			})
		})

		describe('Child Tickets', () => {
			it('should allow the requesting of a single child ticket', () => {
				const tickets = new TicketTypeRequest('CHILD', 1)

				expect(tickets.getTicketType()).to.equal('CHILD')
				expect(tickets.getNoOfTickets()).to.equal(1)
			})
			it('should allow the requesting of multiple child tickets', () => {
				const tickets = new TicketTypeRequest('CHILD', 5)

				expect(tickets.getTicketType()).to.equal('CHILD')
				expect(tickets.getNoOfTickets()).to.equal(5)
			})
		})
		describe('Infant Tickets', () => {
			it('should allow the requesting of a single infant ticket', () => {
				const tickets = new TicketTypeRequest('INFANT', 1)

				expect(tickets.getTicketType()).to.equal('INFANT')
				expect(tickets.getNoOfTickets()).to.equal(1)
			})
			it('should allow the requesting of multiple infant tickets', () => {
				const tickets = new TicketTypeRequest('INFANT', 5)

				expect(tickets.getTicketType()).to.equal('INFANT')
				expect(tickets.getNoOfTickets()).to.equal(5)
			})
		})
	})
})
