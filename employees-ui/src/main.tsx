import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home.js';
import { Employees, employeesLoader } from './components/Employees.js';
import { Tribes } from './components/Tribes.js';
import { Report } from './components/Report.js';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: '',
      element: <Home />,
    },
    {
      path: 'employees',
      element: <Employees />,
      loader: employeesLoader,
    },
    {
      path: 'tribes',
      element: <Tribes />,
    },
    {
      path: 'report',
      element: <Report />,
    },
    ],
    errorElement: <p>Something wrong happened!</p>
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
