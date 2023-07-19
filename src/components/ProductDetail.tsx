import { Product } from '@modyo-dynamic/modyo-service-retail';
import { useTranslation } from 'react-i18next';
import { useFormatCurrency } from '@modyo-dynamic/modyo-design-system-react';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import ItemTitle from './common/ItemTitle';
import ItemDetail from './common/ItemDetail';
import ItemActions from './common/ItemActions';
import ProductDetailsLoader from './loaders/ProductDetailsLoader';
import {
  DETAIL_NO_VALUE,
  FORMAT_DATE,
  ICONS,
  LOAN_APPLICATION_PATH,
  PAYMENTS_PATH,
  PAY_DEBT_PATH,
  SITE_URL,
  TRANSFER_PATH,
} from '../config/widgetConfig';

const ACTIONS: Record<string, (productId: Product['id']) => void> = {
  transfer: (productId) => {
    window.location.href = `${SITE_URL}/${TRANSFER_PATH}?from_account=${productId}`;
  },
  pay: (productId) => {
    window.location.href = `${SITE_URL}/${PAY_DEBT_PATH}?product_id=${productId}`;
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

type Props = {
  selectedProduct?: Product;
  loading: boolean;
};

export default function ProductDetails({ selectedProduct, loading }: Props) {
  const { t } = useTranslation();
  const { format } = useFormatCurrency();

  const action = useCallback((option: string) => {
    if (selectedProduct?.id) {
      ACTIONS[option](selectedProduct?.id);
    }
  }, [selectedProduct?.id]);

  if (loading) {
    return <ProductDetailsLoader />;
  }

  if (!selectedProduct) {
    return null;
  }

  return (
    <div className="card border-0 p-4 gap-3">
      {/* SAVING */}
      {selectedProduct?.type === 'saving' && (
        <>
          <ItemTitle
            text={t('collapse.details.totalBalance')}
            value={selectedProduct.depositDetails?.balances.total
              ? format(selectedProduct.depositDetails.balances.total)
              : DETAIL_NO_VALUE}
          />
          <hr className="m-0" />
          <div className="d-flex flex-column">
            <ItemDetail
              text={t('collapse.details.availableAmount')}
              value={selectedProduct.depositDetails?.balances.available
                ? format(selectedProduct.depositDetails.balances.available)
                : DETAIL_NO_VALUE}
            />
            <ItemDetail
              text={t('collapse.details.fundsOnHold')}
              value={selectedProduct.depositDetails?.balances.unavailable
                ? format(selectedProduct.depositDetails.balances.unavailable)
                : DETAIL_NO_VALUE}
            />
            <ItemDetail
              text={t('collapse.details.interestRate')}
              value={selectedProduct.depositDetails?.interest.settings.rateSettings.rate
                ? `${selectedProduct.depositDetails.interest.settings.rateSettings.rate}%`
                : DETAIL_NO_VALUE}
            />
          </div>
          <hr className="m-0" />
        </>
      )}

      {/* CHECKING */}
      {selectedProduct?.type === 'checking' && (
        <>
          <ItemTitle
            text={t('collapse.details.totalBalance')}
            value={selectedProduct.depositDetails?.balances.total
              ? format(selectedProduct.depositDetails.balances.total)
              : DETAIL_NO_VALUE}
          />
          <hr className="m-0" />
          <div className="d-flex flex-column">
            <ItemDetail
              text={t('collapse.details.availableAmount')}
              value={selectedProduct.depositDetails?.balances.available
                ? format(selectedProduct.depositDetails.balances.available)
                : DETAIL_NO_VALUE}
            />
            <ItemDetail
              text={t('collapse.details.fundsOnHold')}
              value={selectedProduct.depositDetails?.balances.unavailable
                ? format(selectedProduct.depositDetails.balances.unavailable)
                : DETAIL_NO_VALUE}
            />
            <ItemDetail
              text={t('collapse.details.overdraftAmount')}
              value={selectedProduct.depositDetails?.overdraft?.available
                ? format(selectedProduct.depositDetails.overdraft.available)
                : DETAIL_NO_VALUE}
            />
          </div>
          <hr className="m-0" />
        </>
      )}

      {/* SAVING AND CHECKING */}
      {(selectedProduct?.type === 'checking' || selectedProduct?.type === 'saving') && (
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
      )}

      {/* CREDIT CARD */}
      {selectedProduct?.type === 'credit-card' && (
        <>
          <ItemTitle
            text={t('collapse.details.availableCredit')}
            value={selectedProduct.loanDetails?.balances.remaining
              ? format(selectedProduct.loanDetails.balances.remaining)
              : DETAIL_NO_VALUE}
          />
          <hr className="m-0" />
          <div className="d-flex flex-column">
            <ItemDetail
              text={t('collapse.details.minimumPayment')}
              value={selectedProduct.loanDetails?.due
                ? format(selectedProduct.loanDetails.due)
                : DETAIL_NO_VALUE}
            />
            <ItemDetail
              text={t('collapse.details.totalPayment')}
              value={selectedProduct.loanDetails?.balances.owed
                ? format(selectedProduct.loanDetails.balances.owed)
                : DETAIL_NO_VALUE}
            />
            <ItemDetail
              text={t('collapse.details.balance')}
              value={selectedProduct.loanDetails?.amount
                ? format(selectedProduct.loanDetails.amount)
                : DETAIL_NO_VALUE}
            />
          </div>
          <hr className="m-0" />
          <ItemTitle
            text={t('collapse.details.paymentDate')}
          />
          <ItemDetail
            text={t('collapse.details.paymentDate')}
            value={selectedProduct.paymentDetails?.nextDueDate
              ? DateTime.fromISO(selectedProduct.paymentDetails.nextDueDate).toFormat(FORMAT_DATE)
              : DETAIL_NO_VALUE}
          />
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

      {/* LOAN */}
      {selectedProduct?.type === 'loan' && (
        <>
          <ItemTitle
            text={t('collapse.details.outstandingBalance')}
            value={selectedProduct.loanDetails?.balances.owed
              ? format(selectedProduct.loanDetails.balances.owed)
              : DETAIL_NO_VALUE}
          />
          <hr className="m-0" />
          <div className="d-flex flex-column">
            <ItemDetail
              text={t('collapse.details.nextPayment')}
              value={selectedProduct.paymentDetails?.amounts.due
                ? format(selectedProduct.paymentDetails.amounts.due)
                : DETAIL_NO_VALUE}
            />
            <ItemDetail
              text={t('collapse.details.paymentNumber')}
              value={`
            ${selectedProduct.paymentDetails?.lastPaidInstallmentNumber
                ? selectedProduct.paymentDetails.lastPaidInstallmentNumber
                : DETAIL_NO_VALUE}
            /
            ${selectedProduct.loanDetails?.installments
                  ? selectedProduct.loanDetails.installments
                  : DETAIL_NO_VALUE}
            `}
            />
            <ItemDetail
              text={t('collapse.details.annualInterestRate')}
              value={selectedProduct.loanDetails?.interest.settings.rate
                ? `${selectedProduct.loanDetails.interest.settings.rate}%`
                : DETAIL_NO_VALUE}
            />
          </div>
          <hr className="m-0" />
          <ItemTitle
            text={t('collapse.details.paymentDate')}
          />
          <ItemDetail
            text={t('collapse.details.paymentDate')}
            value={selectedProduct.paymentDetails?.nextDueDate
              ? DateTime.fromISO(selectedProduct.paymentDetails.nextDueDate).toFormat(FORMAT_DATE)
              : DETAIL_NO_VALUE}
          />
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
