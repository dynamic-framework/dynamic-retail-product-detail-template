import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getAccounts = createSelector(
  getState,
  (widget) => widget.accounts,
);

export const getAccountsWithFreeze = createSelector(
  getState,
  (widget) => widget.accounts.map((account) => ({
    ...account, freeze: widget.accountsFreezed[account.id],
  })),
);

export const getAccountsFreezed = createSelector(
  getState,
  (widget) => widget.accountsFreezed,
);

export const getAccountSelected = createSelector(
  getState,
  (widget) => widget.accountSelected,
);

export const getIsLoadingAccountList = createSelector(
  getState,
  (widget) => widget.isLoadingAccountList,
);

export const getIsLoadingAccountDetail = createSelector(
  getState,
  (widget) => widget.isLoadingAccountDetail,
);

export const getIsNotReady = createSelector(
  getIsLoadingAccountList,
  getIsLoadingAccountDetail,
  getAccountSelected,
  (isLoadingAccountList, isLoadingAccountDetail, accountSelected) => Boolean(
    isLoadingAccountList
    || isLoadingAccountDetail
    || !accountSelected,
  ),
);

export const getQueryFilter = createSelector(
  getState,
  (widget) => widget.filter.query,
);

export const getSelectedPage = createSelector(
  getState,
  (widget) => widget.selectedPage,
);

export const getMetadata = createSelector(
  getState,
  (widget) => widget.metadata,
);
