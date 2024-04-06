import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginRoute from '@routes/login';
import AdminRoute from '@routes/admin';
import WaiterRoute from './routes/waiter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRoute />,
  },
  {
    path: "/admin",
    element: <AdminRoute />,
  },
  {
    path: "/login",
    element: <LoginRoute />,
  },
  {
    path: "/mesero",
    element: <WaiterRoute />,
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
