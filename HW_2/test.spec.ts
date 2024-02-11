import { Card, Transaction, CurrencyEnum } from './index'

describe('Card', () => {
  let card: Card;

  beforeEach(() => {
    card = new Card();
  });

  it('should add transaction by object and return its ID', () => {
    const transaction = new Transaction(100, CurrencyEnum.USD);
    const id = card.addTransaction(transaction);
    expect(id).toBe(transaction.id);
  });

  it('should add transaction by amount and currency and return its ID', () => {
    const amount = 200;
    const currency = CurrencyEnum.UAH;
    const id = card.addTransaction(amount, currency);
    const addedTransaction = card.getTransaction(id);
    expect(addedTransaction).toBeDefined();
    expect(addedTransaction!.amount).toBe(amount);
    expect(addedTransaction!.currency).toBe(currency);
  });

  it('should get transaction by ID', () => {
    const transaction = new Transaction(150, CurrencyEnum.USD);
    const id = card.addTransaction(transaction);
    const retrievedTransaction = card.getTransaction(id);
    expect(retrievedTransaction).toBe(transaction);
  });

  it('should return undefined for non-existent transaction ID', () => {
    const retrievedTransaction = card.getTransaction('non-existent-id');
    expect(retrievedTransaction).toBeUndefined();
  });

  it('should calculate balance correctly for a specific currency', () => {
    card.addTransaction(100, CurrencyEnum.USD);
    card.addTransaction(200, CurrencyEnum.USD);
    card.addTransaction(300, CurrencyEnum.UAH);
    card.addTransaction(400, CurrencyEnum.USD);
    expect(card.getBalance(CurrencyEnum.USD)).toBe(700);
    expect(card.getBalance(CurrencyEnum.UAH)).toBe(300);
  });

  it('should return 0 balance for non-existent currency', () => {
    expect(card.getBalance(CurrencyEnum.UAH)).toBe(0);
  });
});