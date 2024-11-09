import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login/index.tsx'
import Dashboard from './pages/Dashboard/index.tsx';
import ErrorPage from './pages/Error/error.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';
import { Layout } from './components/Layout/index.tsx';
import { ProtectedRoute } from './routes/ProtectedRoute/index.tsx';
import { Transactions } from './pages/Transactions/index.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ptBR } from 'date-fns/locale';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />, // Verifica se está autenticado
    children: [
      {
        element: <Layout />, // Aplica o layout para todas as rotas autenticadas
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "transactions", element: <Transactions /> },
          // Adicione outras páginas aqui
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <GlobalStyle /> 
      <RouterProvider router={router} />
     </LocalizationProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
