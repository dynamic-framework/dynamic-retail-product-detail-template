import { createDraftSafeSelector } from '@reduxjs/toolkit';
import type { Transaction } from '@modyo-dynamic/modyo-service-retail';
import { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getProducts = createDraftSafeSelector(
  getState,
  (widget) => widget.products,
);

export const getSelectedProduct = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedProduct,
);

export const getTransactions = createDraftSafeSelector(
  getState,
  (widget) => widget.transactions,
);

export const getFilterTransactions = createDraftSafeSelector(
  getState,
  (widget) => widget.filterTransactions,
);

export const getFilteredTransactions = createDraftSafeSelector(
  getTransactions,
  getFilterTransactions,
  (transactions, filter) => {
    if (filter.query === '') {
      return transactions;
    }

    return transactions.filter(({ name }: Transaction) => (
      name.toLowerCase().includes(filter.query)));
  },
);

export const getTransactionsScheduled = createDraftSafeSelector(
  getState,
  (widget) => widget.transactionsScheduled,
);
