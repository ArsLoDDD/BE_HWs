import { Pocket, Card, Transaction, CurrencyEnum } from './index'

describe('Pocket', () => {
	let pocket: Pocket
	let card1: Card
	let card2: Card

	beforeEach(() => {
		pocket = new Pocket()
		card1 = new Card()
		card2 = new Card()
		pocket.addCard('card1', card1)
		pocket.addCard('card2', card2)
	})

	test('addCard should add a new card to the pocket', () => {
		expect(pocket.cards.length).toBe(2)
		const newCard = new Card()
		pocket.addCard('newCard', newCard)
		expect(pocket.cards.length).toBe(3)
	})

	test('getCard should return the card with the given name', () => {
		const retrievedCard = pocket.getCard('card1')
		expect(retrievedCard).toBe(card1)
	})

	test('getCard should return "Card not found" if the card with the given name does not exist', () => {
		const retrievedCard = pocket.getCard('nonExistentCard')
		expect(retrievedCard).toBe('Card not found')
	})

	test('removeCard should remove the card with the given name', () => {
		expect(pocket.cards.length).toBe(2)
		pocket.removeCard('card1')
		expect(pocket.cards.length).toBe(1)
		const retrievedCard = pocket.getCard('card1')
		expect(retrievedCard).toBe('Card not found')
	})

	test('getTotalAmount should return the total balance across all cards in the specified currency', () => {
		// Mock transactions
		card1.addTransaction(new Transaction(100, CurrencyEnum.USD))
		card1.addTransaction(new Transaction(200, CurrencyEnum.USD))
		card2.addTransaction(new Transaction(50, CurrencyEnum.UAH))

		// Total balance in USD: 100 + 200 = 300
		// Total balance in UAH: 50
		expect(pocket.getTotalAmount(CurrencyEnum.USD)).toBe(300)
		expect(pocket.getTotalAmount(CurrencyEnum.UAH)).toBe(50)
	})
})
