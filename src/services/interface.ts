import { AccountBaseType, AccountType, ActivityStatus } from './config';

export type BaseAccount<T extends AccountBaseType> = {
  id: string;
  name: string;
  alias?: string;
  accountNumber: string;
  type: AccountType;
  baseType: T;
};

export type DepositAccount = BaseAccount<AccountBaseType.Deposit> & {
  balanceAvailable?: number;
  balanceTotal?: number;
  balanceUnavailable?: number;
  interestRate?: number;
  overdraftAvailable?: number;
};

export type LoanAccount = BaseAccount<AccountBaseType.Loan> & {
  due?: number;
  amount?: number;
  balanceOwed?: number;
  balanceRemaining?: number;
  paymentNextDueDate?: string;
  paymentDue?: number;
  paymentLastPaidInstallmentNumber?: number;
  installments?: number;
  interestRate?: number;
};

export type Account = DepositAccount | LoanAccount;

export type Activity = {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: ActivityStatus;
};
