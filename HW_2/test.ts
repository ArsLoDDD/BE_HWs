import { Card, Transaction, CurrencyEnum } from './index'

const card = new Card()

const transaction1 = new Transaction(100, CurrencyEnum.USD)
const transaction2 = new Transaction(200, CurrencyEnum.UAH)
card.addTransaction(transaction1)
card.addTransaction(transaction2)

card.addTransaction(150, CurrencyEnum.USD)

const id = card.addTransaction(300, CurrencyEnum.UAH)
const transactionById = card.getTransaction(id)

const balanceUSD = card.getBalance(CurrencyEnum.USD)
const balanceUAH = card.getBalance(CurrencyEnum.UAH)

console.log('Transaction 1:', transaction1)
console.log('Transaction 2:', transaction2)
console.log('Get Transaction by ID:', transactionById)
console.log('Balance in USD:', balanceUSD)
console.log('Balance in UAH:', balanceUAH)
