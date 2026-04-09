import type { TransactionIconKey, TransactionType } from '../constants';

export type TransactionId = string;
export type TransactionDate = string;
export type AuthorizedUser = string;

export interface BaseTransaction {
  id: TransactionId;
  type: TransactionType;
  amount: number;
  transactionName: string;
  transactionDescription: string;
  date: TransactionDate;
  pending?: boolean;
  icon: TransactionIconKey;
}

export interface CreditTransaction extends BaseTransaction {
  type: 'credit';
  authorizedUser?: AuthorizedUser;
}

export interface PaymentTransaction extends BaseTransaction {
  type: 'payment';
}

export type Transaction = CreditTransaction | PaymentTransaction;
export type TransactionsGroup = Transaction[];
export type TransactionsCollection = TransactionsGroup[];

export interface Wallet {
  limit: number;
  balance: number;
}
