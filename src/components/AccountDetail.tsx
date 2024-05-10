import classNames from 'classnames';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

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
import { AccountType } from '../services/config';
import type { Account, DepositAccount, LoanAccount } from '../services/interface';
import { useAppSelector } from '../store/hooks';
import { getAccountSelected, getIsLoadingAccountDetail } from '../store/selectors';

import AccountDetailChecking from './AccountDetailChecking';
import AccountDetailCreditCard from './AccountDetailCreditCard';
import AccountDetailLoan from './AccountDetailLoan';
import AccountDetailSaving from './AccountDetailSaving';
import ActionsSelectorPicker from './ActionsSelectorPicker';
import ActionsSelectorSlider from './ActionsSelectorSlider';
import AccountDetailLoader from './loaders/AccountDetailsLoader';

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
      <div className={classNames(SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && 'px-4 pb-4 pt-8')}>
        <AccountDetailLoader />
      </div>
    );
  }

  return (
    <div className={classNames(
      'd-flex flex-column p-6 gap-4',
      { 'card border-0 shadow-none': !SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) },
    )}
    >
      {account?.type === AccountType.Saving && (
        <>
          <AccountDetailSaving
            className="d-none d-lg-block"
            account={account as DepositAccount}
          />
          <ActionsSelectorSlider
            text={t('collapse.actions.transfer')}
            icon={ICONS.transfer}
            url={`${SITE_URL}/${TRANSFER_PATH}?from_account=${account.id}`}
          />
        </>
      )}
      {account?.type === AccountType.Checking && (
        <>
          <AccountDetailChecking
            className="d-none d-lg-block"
            account={account as DepositAccount}
          />
          <ActionsSelectorSlider
            text={t('collapse.actions.transfer')}
            icon={ICONS.transfer}
            url={`${SITE_URL}/${TRANSFER_PATH}?from_account=${account.id}`}
          />
        </>
      )}
      {account?.type === AccountType.CreditCard && (
        <>
          <AccountDetailCreditCard
            className="d-none d-lg-block"
            account={account as LoanAccount}
          />
          <ActionsSelectorSlider
            text={t('collapse.actions.makePayment')}
            icon={ICONS.pay}
            url={`${SITE_URL}/${PAY_DEBT_PATH}?account_id=${account.id}`}
          />
        </>
      )}
      {account?.type === AccountType.Loan && (
        <>
          <AccountDetailLoan account={account as LoanAccount} />
          <hr className="m-0" />
          <ActionsSelectorPicker
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
