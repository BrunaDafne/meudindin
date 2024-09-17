import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login/index.tsx'
import Dashboard from './pages/Dashboard/index.tsx';
import ErrorPage from './pages/Error/error.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle /> 
    <RouterProvider router={router} />
  </StrictMode>,
)
