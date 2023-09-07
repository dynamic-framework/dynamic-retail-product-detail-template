import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Account, Activity } from '../services/interface';

export type WidgetState = {
  accounts: Array<Account>,
  accountSelected?: Account;
  isLoadingAccountList: boolean;
  isLoadingAccountDetail: boolean;
  activities: Array<Activity>;
  filterActivities: {
    query: string;
  }
};

const initialState: WidgetState = {
  accounts: [],
  accountSelected: undefined,
  isLoadingAccountList: false,
  isLoadingAccountDetail: false,
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
  },
});

export const {
  setAccounts,
  setAccountSelected,
  setIsLoadingAccountList,
  setIsLoadingAccountDetail,
  setActivities,
  setQueryFilterActivities,
} = slice.actions;
export default slice.reducer;
