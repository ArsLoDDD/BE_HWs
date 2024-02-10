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
class Card {
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
		} else if (typeof type === 'number' && currency) {
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

export { Card, Transaction, CurrencyEnum }

// const card = new Card()
// card.addTransaction(100, CurrencyEnum.USD)
// card.addTransaction(100, CurrencyEnum.USD)
// card.addTransaction(345, CurrencyEnum.USD)
// card.addTransaction(new Transaction(300, CurrencyEnum.USD))
// card.addTransaction(3999, CurrencyEnum.UAH)

// console.log('Your UAH balance:', card.getBalance(CurrencyEnum.UAH))
// console.log('Your USD balance:', card.getBalance(CurrencyEnum.USD))
