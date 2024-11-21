export type ApiErrorItem = {
  status: string;
  code: string;
  title: string;
  messageCode: string;
  detail: string;
};

export type ApiAccountAccountType = 'REGULAR_SAVINGS' | 'CURRENT_ACCOUNT' | 'LOAN' | 'CREDIT_CARD';

export type ApiAccountType = 'DEPOSIT' | 'LOAN';

export type ApiPayments = {
  currency: string;
  lastPaidDate: string;
  dueSinceDate: string;
  nextDueDate: string;
  lastPaidInstallmentNumber: number;
  amounts: {
    due: number;
    expected: number;
    paid: number;
  };
};

export type ApiAccount = {
  id: string;
  nickName: string;
  accountNumber: string;
  freeze: boolean;
  type: ApiAccountType;
  accountType: ApiAccountAccountType;
  accountingBalance: number;
  availableBalance: number;
  currency: string;
  totalCharges: number;
  totalIncomes: number;
  closedAt: string;
  created: string;
  modified: string;
  status: string;
  depositDetails?: ApiDepositDetails;
  loanDetails?: ApiLoanDetails;
  paymentDetails?: ApiPayments;
};

export type ApiDepositDetails = {
  balances: {
    total: number;
    available: number;
    unavailable: number;
  }
  overdraft?: {
    limit: number;
    total: number;
    available: number;
    expiryDate: string; // ISO8601
  };
  maturityDate?: string; // ISO8601
  interest: {
    accrued: number;
    accruedNegative: number;
    settings?: {
      rateSettings?: {
        rate?: number;
        tiers?: number;
        terms?: string;
        source?: string;
      },
      paymentPoint: string;
      paymentDates: Array<Record<string, unknown>>;
    };
  };
};

export type ApiLoanDetails = {
  amount: number;
  balances: {
    owed: number;
    remaining: number;
  };
  due: number;
  daysInArrears: number;
  daysLate: number;
  installments: number;
  interest: {
    accrued: number;
    accruedInBillingCycle: number;
    accruedFromArrears: number;
    settings: {
      rate: number;
      rates: null;
      type: string;
      source: string;
    };
  };
};

export type ApiDepositActivity = {
  id: string;
  type: string;
  description: string;
  amount: number;
  bookingDate: string;
  effectiveDate: string;
  totalBalance: number;
  creationDate: string;
  currencyCode: string;
};

export type ApiLoanActivity = {
  id: string;
  type: string;
  description: string;
  amount: number;
  bookingDate: string;
  effectiveDate: string;
  accountId: number;
  subject: string;
  transactionTypeId: string;
  balance: number;
  clientId: string;
  payeeId: string;
  created: string;
  modified: string;
  valueDate: string;
};

export type ApiCheckbook = {
  id: string;
  date: string;
  active: boolean
};

export type ApiResponsePaginatedWrapped<T> = {
  metadata: {
    page: number;
    rows: number;
    total_pages: number;
    total_rows: number;
  },
  content: T[];
};

export type ApiActivity = ApiDepositActivity | ApiLoanActivity;
