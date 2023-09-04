import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Account, Activity } from '../services/interface';

export type WidgetState = {
  accounts: Array<Account>,
  selectedAccount?: Account;
  isLoadingAccounts: boolean;
  isLoadingSelectedAccount: boolean;
  activities: Array<Activity>;
  filterActivities: {
    query: string;
  }
};

const initialState: WidgetState = {
  accounts: [],
  selectedAccount: undefined,
  isLoadingAccounts: false,
  isLoadingSelectedAccount: false,
  activities: [],
  filterActivities: {
    query: '',
  },
} as WidgetState;

const slice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<Array<Account>>) {
      state.accounts = action.payload;
    },
    setSelectedAccount(state, action: PayloadAction<Account | undefined>) {
      state.selectedAccount = action.payload;
    },
    setIsLoadingAccounts(state, action: PayloadAction<boolean>) {
      state.isLoadingAccounts = action.payload;
    },
    setIsLoadingSelectedAccount(state, action: PayloadAction<boolean>) {
      state.isLoadingSelectedAccount = action.payload;
    },
    setActivities(state, action: PayloadAction<Array<Activity>>) {
      state.activities = action.payload;
    },
    setQueryFilterActivities(state, action: PayloadAction<string>) {
      state.filterActivities.query = action.payload;
    },
  },
});

export const {
  setAccounts,
  setSelectedAccount,
  setIsLoadingAccounts,
  setIsLoadingSelectedAccount,
  setActivities,
  setQueryFilterActivities,
} = slice.actions;
export default slice.reducer;
