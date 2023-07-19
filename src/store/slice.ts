import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Product, Transaction } from '@modyo-dynamic/modyo-service-retail';

export type WidgetState = {
  products: Array<Product>,
  selectedProduct?: Product;
  transactions: Array<Transaction>;
  transactionsScheduled: Array<Transaction>;
  filterTransactions: {
    query: string;
  }
};

const initialState = {
  products: [],
  selectedProduct: undefined,
  transactions: [],
  transactionsScheduled: [],
  filterTransactions: {
    query: '',
  },
} as WidgetState;

const slice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Array<Product>>) {
      state.products = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<Product | undefined>) {
      state.selectedProduct = action.payload;
    },
    setTransactions(
      state,
      action: PayloadAction<Array<Transaction>>,
    ) {
      state.transactions = action.payload;
    },
    setTransactionsScheduled(
      state,
      action: PayloadAction<Array<Transaction>>,
    ) {
      state.transactionsScheduled = action.payload;
    },
    setQueryFilterTransaction(state, action: PayloadAction<string>) {
      state.filterTransactions.query = action.payload;
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  setTransactions,
  setTransactionsScheduled,
  setQueryFilterTransaction,
} = slice.actions;
export default slice.reducer;
