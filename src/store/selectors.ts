import { createDraftSafeSelector } from '@reduxjs/toolkit';

import type { RootState } from './store';
import type { Activity } from '../services/interface';

const getState = (state: RootState) => state.widget;

export const getAccounts = createDraftSafeSelector(
  getState,
  (widget) => widget.accounts,
);

export const getSelectedAccount = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedAccount,
);

export const getIsLoadingAccounts = createDraftSafeSelector(
  getState,
  (widget) => widget.isLoadingAccounts || !widget.selectedAccount,
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
