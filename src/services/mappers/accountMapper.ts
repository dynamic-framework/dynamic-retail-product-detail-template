import type { ApiAccount } from '../api-interface';
import {
  AccountBaseType,
  ApiAccountTypeConfig,
} from '../config';
import type { Account } from '../interface';

export default function accountMapper(apiAccount: ApiAccount): Account {
  const baseType = apiAccount.type.toLowerCase() as AccountBaseType;

  const commonProps = {
    id: apiAccount.id,
    name: apiAccount.account_holder_name,
    alias: apiAccount.account_holder_name,
    accountNumber: apiAccount.masked_number,
    freeze: apiAccount.card?.is_frozen ?? false,
    type: ApiAccountTypeConfig[apiAccount.group],
  };

  if (baseType === AccountBaseType.Loan) {
    return {
      ...commonProps,
      baseType,
      balanceOwed: apiAccount.loan?.details.balance.owed,
      balanceRemaining: apiAccount.loan?.details.balance.remaining,
      due: apiAccount.loan?.details.total,
      paymentDue: apiAccount.loan?.details.amount_due,
      paymentNextDueInstallmentNumber: apiAccount.loan?.next_due_installment_number,
      installments: apiAccount.loan?.term.count,
      interestRate: apiAccount.loan?.details.interest.rate_settings.yearly_rate,
      paymentNextDueDate: apiAccount.loan?.dates.next_due,
      expiryDate: apiAccount.loan?.dates.next_due,
    };
  }

  return {
    ...commonProps,
    baseType,
    balanceAvailable: apiAccount.deposit?.balance.available.total,
    balanceTotal: apiAccount.deposit?.balance.total,
    balanceUnavailable: apiAccount.deposit?.balance.not_available,
    interestRate: apiAccount.deposit?.interest.rateSettings?.yearly_rate,
    overdraftAvailable: apiAccount.deposit?.overdraft.details.balance.remaining,
  };
}
