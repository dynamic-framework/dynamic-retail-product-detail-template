import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Account, Activity } from '../services/interface';

export type WidgetState = {
  accounts: Array<Account>,
  accountsFreezed: Record<string, boolean>;
  accountSelected?: Account;
  isLoadingAccountList: boolean;
  isLoadingAccountDetail: boolean;
  activities: Array<Activity>;
  filterActivities: {
    query: string;
  },
  filterCheckbooks: {
    query: string;
  }
};

const initialState: WidgetState = {
  accounts: [],
  accountsFreezed: {},
  accountSelected: undefined,
  isLoadingAccountList: false,
  isLoadingAccountDetail: false,
  activities: [],
  filterActivities: {
    query: '',
  },
  filterCheckbooks: {
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
    setAccountsFreezed(state, action: PayloadAction<Record<string, boolean>>) {
      state.accountsFreezed = { ...state.accountsFreezed, ...action.payload };
    },
    setAccountSelected(state, action: PayloadAction<Account | undefined>) {
      state.accountSelected = action.payload;
    },
    setIsLoadingAccountList(state, action: PayloadAction<boolean>) {
      state.isLoadingAccountList = action.payload;
    },
    setIsLoadingAccountDetail(state, action: PayloadAction<boolean>) {
      state.isLoadingAccountDetail = action.payload;
    },
    setActivities(state, action: PayloadAction<Array<Activity>>) {
      state.activities = action.payload;
    },
    setQueryFilterActivities(state, action: PayloadAction<string>) {
      state.filterActivities.query = action.payload;
    },
    setQueryFilterCheckbook(state, action: PayloadAction<string>) {
      state.filterCheckbooks.query = action.payload;
    },
  },
});

export const {
  setAccounts,
  setAccountSelected,
  setIsLoadingAccountList,
  setIsLoadingAccountDetail,
  setActivities,
  setQueryFilterActivities,
  setAccountsFreezed,
  setQueryFilterCheckbook,
} = slice.actions;
export default slice.reducer;
