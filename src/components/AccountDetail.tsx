import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import ItemActions from './ItemActions';
import AccountDetailLoader from './loaders/AccountDetailsLoader';
import {
  ICONS,
  LOAN_APPLICATION_PATH,
  PAYMENTS_PATH,
  PAY_DEBT_PATH,
  SITE_URL,
  TRANSFER_PATH,
} from '../config/widgetConfig';
import { useAppSelector } from '../store/hooks';
import { getIsLoadingAccounts, getSelectedAccount } from '../store/selectors';
import AccountDetailSaving from './AccountDetailSaving';
import AccountDetailChecking from './AccountDetailChecking';
import AccountDetailCreditCard from './AccountDetailCreditCard';
import AccountDetailLoan from './AccountDetailLoan';

import type { Account, DepositAccount, LoanAccount } from '../services/interface';

const ACTIONS: Record<string, (accountId: Account['id']) => void> = {
  transfer: (accountId) => {
    window.location.href = `${SITE_URL}/${TRANSFER_PATH}?from_account=${accountId}`;
  },
  pay: (accountId) => {
    window.location.href = `${SITE_URL}/${PAY_DEBT_PATH}?account_id=${accountId}`;
  },
  payments: () => {
    window.location.href = `${SITE_URL}/${PAYMENTS_PATH}`;
  },
  applyCredit: () => {
    window.location.href = `${SITE_URL}/${LOAN_APPLICATION_PATH}`;
  },
  paymentPlan: () => { },
  statement: () => { },
  advance: () => { },
};

export default function AccountDetail() {
  const { t } = useTranslation();

  // we know that at this point the account exists.
  const account = useAppSelector(getSelectedAccount) as Account;
  const loading = useAppSelector(getIsLoadingAccounts);

  const action = useCallback((option: string) => {
    if (account?.id) {
      ACTIONS[option](account?.id);
    }
  }, [account?.id]);

  if (loading) {
    return <AccountDetailLoader />;
  }

  return (
    <div className="card border-0 p-4 gap-3">
      {account?.type === 'saving' && (
        <>
          <AccountDetailSaving account={account as DepositAccount} />
          <hr className="m-0" />
          <ItemActions
            primaryText={t('collapse.actions.transfer')}
            primaryIcon={ICONS.transfer}
            primaryAction={() => action('transfer')}
            secondaryText={t('collapse.actions.payment')}
            secondaryIcon={ICONS.pay}
            secondaryAction={() => action('payments')}
            tertiaryText={t('collapse.actions.applyCredit')}
            tertiaryIcon={ICONS.applyCredit}
            tertiaryAction={() => action('applyCredit')}
          />
        </>
      )}
      {account?.type === 'checking' && (
        <>
          <AccountDetailChecking account={account as DepositAccount} />
          <hr className="m-0" />
          <ItemActions
            primaryText={t('collapse.actions.transfer')}
            primaryIcon={ICONS.transfer}
            primaryAction={() => action('transfer')}
            secondaryText={t('collapse.actions.payment')}
            secondaryIcon={ICONS.pay}
            secondaryAction={() => action('payments')}
            tertiaryText={t('collapse.actions.applyCredit')}
            tertiaryIcon={ICONS.applyCredit}
            tertiaryAction={() => action('applyCredit')}
          />
        </>
      )}
      {account?.type === 'credit-card' && (
        <>
          <AccountDetailCreditCard account={account as LoanAccount} />
          <hr className="m-0" />
          <ItemActions
            primaryText={t('collapse.actions.makePayment')}
            primaryIcon={ICONS.pay}
            primaryAction={() => action('pay')}
            secondaryText={t('collapse.actions.advance')}
            secondaryIcon={ICONS.advance}
            secondaryAction={() => action('advance')}
            tertiaryText={t('collapse.actions.statement')}
            tertiaryIcon={ICONS.statement}
            tertiaryAction={() => action('statement')}
          />
        </>
      )}
      {account?.type === 'loan' && (
        <>
          <AccountDetailLoan account={account as LoanAccount} />
          <hr className="m-0" />
          <ItemActions
            primaryText={t('collapse.actions.makePayment')}
            primaryIcon={ICONS.pay}
            primaryAction={() => action('pay')}
            secondaryText={t('collapse.actions.statement')}
            secondaryIcon={ICONS.statement}
            secondaryAction={() => action('statement')}
            tertiaryText={t('collapse.actions.paymentPlan')}
            tertiaryIcon={ICONS.paymentPlan}
            tertiaryAction={() => action('paymentPlan')}
          />
        </>
      )}
    </div>
  );
}
