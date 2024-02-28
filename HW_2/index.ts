import { v4 as uuidv4 } from 'uuid' // использовал эту библиотеку так как crypto.randomUUID() не хотел работать

enum CurrencyEnum {
	USD = 'USD',
	UAH = 'UAH',
}

interface ITransaction {
	// добавил интерфейс только потому что сказали в задании "максимальним використанням можливостей тайпскрипту", я не смог ничего кроме этого влипить)
	id: string
	amount: number
	currency: CurrencyEnum
}

class Transaction implements ITransaction {
	id: string
	amount: number
	currency: CurrencyEnum
	constructor(amount: number, currency: CurrencyEnum) {
		this.id = uuidv4()
		this.amount = amount
		this.currency = currency
	}
}

interface ICard {
	transactions: Transaction[]
	addTransaction(transaction: Transaction): string
	addTransaction(amount: number, currency: CurrencyEnum): string
	getTransaction(id: string): Transaction | undefined
	getBalance(currency: CurrencyEnum): number
}

class Card implements ICard {
	transactions: Transaction[]
	constructor() {
		this.transactions = []
	}

	addTransaction(transaction: Transaction): string
	addTransaction(amount: number, currency: CurrencyEnum): string

	addTransaction(type: Transaction | number, currency?: CurrencyEnum): string {
		if (type instanceof Transaction) {
			this.transactions.push(type)
			return type.id
		} else if (typeof type === 'number' && currency !== undefined) {
			const transaction = new Transaction(type, currency)
			this.transactions.push(transaction)
			return transaction.id
		}
		return 'Invalid input'
	}

	getTransaction(id: string): Transaction | undefined {
		return this.transactions.find(transaction => transaction.id === id)
	}

	getBalance(currency: CurrencyEnum): number {
		return this.transactions.reduce(
			(acc: number, transaction: Transaction): number => {
				if (transaction.currency === currency) {
					return (acc += transaction.amount)
				}
				return acc
			},
			0
		)
	}
}

class BonusCard extends Card {
	constructor() {
		super()
	}

	addTransaction(type: Transaction | number, currency?: CurrencyEnum): string {
		if (type instanceof Transaction) {
			const bonusTransaction = new Transaction(type.amount * 0.1, type.currency)
			this.transactions.push(bonusTransaction)
			return super.addTransaction(type)
		} else if (typeof type === 'number' && currency !== undefined) {
			const bonusTransaction = new Transaction(type * 0.1, currency)
			this.transactions.push(bonusTransaction)
			return super.addTransaction(type, currency)
		}
		return 'Invalid input'
	}

	getBalance(currency: CurrencyEnum): number {
		return this.transactions.reduce(
			(acc: number, transaction: Transaction): number => {
				if (transaction.currency === currency) {
					return (acc += transaction.amount)
				}
				return acc
			},
			0
		)
	}
}

class Pocket {
	cards: Record<string, Card>[]
	constructor() {
		this.cards = []
	}
	addCard(name: string, card: Card): void {
		this.cards.push({ [name]: card })
	}
	removeCard(name: string): void {
		this.cards = this.cards.filter(card => Object.keys(card)[0] !== name)
	}
	getCard(name: string): Card | string {
		console.log(name)
		const userCard = this.cards.find(card => Object.keys(card)[0] === name)
		if (userCard) return userCard[name]
		return 'Card not found'
	}
	getTotalAmount(currency: CurrencyEnum): number {
		return this.cards.reduce(
			(acc: number, card: Record<string, Card>): number => {
				return (acc += Object.values(card)[0].getBalance(currency))
			},
			0
		)
	}
}

export {
	Card,
	Transaction,
	CurrencyEnum,
	BonusCard,
	Pocket,
	ICard,
	ITransaction,
}
