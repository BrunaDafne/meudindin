// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import transactionsReducer from '../features/transactionsSlice';
import walletReducer from '../features/walletSlice';
import budgetsReducer from '../features/budgetSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usando localStorage como persistência

// Configuração de persistência para o usuário
const userPersistConfig = {
  key: 'user',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Configuração de persistência para as transações
const transactionsPersistConfig = {
  key: 'transactions',
  storage,
};

const persistedTransactionsReducer = persistReducer(transactionsPersistConfig, transactionsReducer);

// Configuração de persistência para carteiras
const walletsPersistConfig = {
  key: 'wallets',
  storage,
};

const persistedWalletReducer = persistReducer(walletsPersistConfig, walletReducer);

const budgetsPersistConfig = {
  key: 'budgets',
  storage,
};

const persistedBudgetsReducer = persistReducer(budgetsPersistConfig, budgetsReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    transactions: persistedTransactionsReducer,
    wallets: persistedWalletReducer,
    budgets: persistedBudgetsReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
