import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';
import ItemActions from './ItemActions';
import AccountDetailLoader from './loaders/AccountDetailsLoader';
import {
  API_ACCOUNT_LIST_FILTER,
  ICONS,
  LOAN_APPLICATION_PATH,
  PAYMENTS_PATH,
  PAY_DEBT_PATH,
  SITE_URL,
  SLIDE_VIEWS,
  TRANSFER_PATH,
} from '../config/widgetConfig';
import { useAppSelector } from '../store/hooks';
import { getAccountSelected, getIsLoadingAccountDetail } from '../store/selectors';
import AccountDetailSaving from './AccountDetailSaving';
import AccountDetailChecking from './AccountDetailChecking';
import AccountDetailCreditCard from './AccountDetailCreditCard';
import AccountDetailLoan from './AccountDetailLoan';

import type { Account, DepositAccount, LoanAccount } from '../services/interface';
import { AccountType } from '../services/config';

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
  const loading = useAppSelector(getIsLoadingAccountDetail);
  const account = useAppSelector(getAccountSelected) as Account;

  const action = useCallback((option: string) => {
    if (account?.id) {
      ACTIONS[option](account?.id);
    }
  }, [account?.id]);

  if (loading) {
    return (
      <div className={classNames(SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && 'px-3 pb-3')}>
        <AccountDetailLoader />
      </div>
    );
  }

  return (
    <div className={classNames(
      'd-flex flex-column p-4 gap-3',
      { 'card border-0 shadow-none': !SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) },
    )}
    >
      {SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && (
        <hr className="m-0 px-3" />
      )}

      {account?.type === AccountType.Saving && (
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
      {account?.type === AccountType.Checking && (
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
      {account?.type === AccountType.CreditCard && (
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
      {account?.type === AccountType.Loan && (
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
