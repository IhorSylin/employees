import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home.js';
import { Employees, employeesLoader } from './components/Employees.js';
import { Tribes, tribesLoader } from './components/Tribes.js';
import { Report, reportLoader } from './components/Report.js';
import { EmployeesById, employeesByIdLoader } from './components/EmployeesById.js';

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
      path: 'employees/:id',
      element: <EmployeesById />,
      loader: employeesByIdLoader,
    },
    {
      path: 'tribes',
      element: <Tribes />,
      loader: tribesLoader,
    },
    {
      path: 'report',
      element: <Report />,
      loader: reportLoader,
    },
    
    ],
    errorElement: <p>Something wrong happened!</p>
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
