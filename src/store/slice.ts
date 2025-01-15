import { getQueryString } from '@dynamic-framework/ui-react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  Account,
  Metadata,
} from '../services/interface';

export type WidgetState = {
  accounts: Array<Account>;
  accountsFreezed: Record<string, boolean>;
  accountSelected?: Account;
  isLoadingAccountList: boolean;
  isLoadingAccountDetail: boolean;
  filter: {
    query: string;
  },
  selectedPage: string;
  metadata: Metadata;
};

const initialState: WidgetState = {
  accounts: [],
  accountsFreezed: {},
  accountSelected: undefined,
  isLoadingAccountList: false,
  isLoadingAccountDetail: false,
  filter: {
    query: '',
  },
  selectedPage: getQueryString('page') || '1',
  metadata: {
    page: 0,
    totalPages: 0,
  },
};

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
    setQueryFilter(state, action: PayloadAction<string>) {
      state.filter.query = action.payload;
    },
    setSelectedPage(state, action: PayloadAction<string>) {
      state.selectedPage = action.payload;
    },
    setMetadata(state, action: PayloadAction<Metadata>) {
      state.metadata = action.payload;
    },
  },
});

export const {
  setAccounts,
  setAccountSelected,
  setIsLoadingAccountList,
  setIsLoadingAccountDetail,
  setQueryFilter,
  setAccountsFreezed,
  setSelectedPage,
  setMetadata,
} = slice.actions;
export default slice.reducer;
