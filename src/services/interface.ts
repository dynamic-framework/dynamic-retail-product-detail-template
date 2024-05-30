import { AccountBaseType, AccountType, ActivityStatus } from './config';

export type BaseAccount = {
  id: string;
  name: string;
  alias?: string;
  accountNumber: string;
  type: AccountType;
  freeze: boolean;
};

export type BaseAccountDiscriminator<T extends AccountBaseType> = BaseAccount & {
  baseType: T;
};

export type DepositAccount = BaseAccountDiscriminator<AccountBaseType.Deposit> & {
  balanceAvailable?: number;
  balanceTotal?: number;
  balanceUnavailable?: number;
  interestRate?: number;
  overdraftAvailable?: number;
};

export type LoanAccount = BaseAccountDiscriminator<AccountBaseType.Loan> & {
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
