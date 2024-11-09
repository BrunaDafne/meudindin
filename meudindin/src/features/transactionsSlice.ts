// src/features/transactionsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: number;
  id_user: number;
  id_type: number;
  title: string;
  description?: string;
  value: number;
  date: Date;
  id_wallet?: number;
  id_card?: number;
  id_category: number;
  created_date: Date;
  //is_recurring?: boolean;
  //is_installment?: boolean;
}

interface TransactionsState {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
  },
});

export const { addTransaction, removeTransaction, setTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
