import { createDraftSafeSelector } from '@reduxjs/toolkit';

import type { RootState } from './store';
import type { Activity } from '../services/interface';

const getState = (state: RootState) => state.widget;

export const getAccounts = createDraftSafeSelector(
  getState,
  (widget) => widget.accounts,
);

export const getAccountSelected = createDraftSafeSelector(
  getState,
  (widget) => widget.accountSelected,
);

export const getIsLoadingAccountList = createDraftSafeSelector(
  getState,
  (widget) => widget.isLoadingAccountList,
);

export const getIsLoadingAccountDetail = createDraftSafeSelector(
  getState,
  (widget) => widget.isLoadingAccountDetail,
);

export const getIsNotReady = createDraftSafeSelector(
  getIsLoadingAccountList,
  getIsLoadingAccountDetail,
  getAccountSelected,
  (isLoadingAccountList, isLoadingAccountDetail, accountSelected) => Boolean(
    isLoadingAccountList
    || isLoadingAccountDetail
    || !accountSelected,
  ),
);

export const getActivities = createDraftSafeSelector(
  getState,
  (widget) => widget.activities,
);

export const getFilterActivities = createDraftSafeSelector(
  getState,
  (widget) => widget.filterActivities,
);

export const getFilteredActivities = createDraftSafeSelector(
  getActivities,
  getFilterActivities,
  (activities, filter) => {
    if (filter.query === '') {
      return activities;
    }

    return activities.filter(({ name }: Activity) => (
      name.toLowerCase().includes(filter.query)
    ));
  },
);
