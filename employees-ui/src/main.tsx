import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [{
    //   path: 'jokes',
    //   element: <JokesWithLoader />,
    //   loader: jokesLoader,
    // }],
    errorElement: <p>Something wrong happened!</p>
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
