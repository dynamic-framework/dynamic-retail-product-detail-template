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
    // setFreezeAccount(state, action: PayloadAction<{ id: string, freeze: boolean }>) {
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   const tmpAccount = JSON.parse(JSON.stringify(state.accounts));
    //   const indexAccount = tmpAccount.find((e: { id: string; }) => e.id === action.payload.id);
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    //   tmpAccount[indexAccount].freeze = action.payload.freeze;

    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   state.accounts = tmpAccount;
    // },
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
  setFreezeAccount,
} = slice.actions;
export default slice.reducer;
