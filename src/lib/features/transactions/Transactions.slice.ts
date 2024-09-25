import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TransactionView = 'Table' | 'Card';

export interface TransactionSlice {
  transactionView: TransactionView;
}

// Define the initial state using that type
const initialState: TransactionSlice = {
  transactionView: 'Table',
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionView: (state, action: PayloadAction<TransactionView>) => {
      return { ...state, transactionView: action.payload };
    },
    resetTransactionView: (state, action: PayloadAction<void>) => {
      return { ...state, transactionView: 'Table' };
    },
  },
});

// actions
export const { setTransactionView, resetTransactionView } =
  transactionSlice.actions;

// reducer
export default transactionSlice.reducer;
