// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './Components/Home/Home';
import Frieghtdetail from './Components/Frieghtdetail/Frieghtdetail';
import Stockhouse from './Components/stockhouse/Stockhouse';
import Agentpayment from './Components/AgentPayment/Agentpayment';
import Customer from './Components/customer/Customer';
import PurchaseInChina from './Components/PurchaseInChina/PurchaseInChina';
import Recovery from './Components/Recovery/Recovery'; // Import the Recovery component
import Login from './Components/Login/Login'; // Import the Login component
import './index.css';
import Logout from './Components/Logout/Logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'Frieghtdetail',
        element: <Frieghtdetail />
      },
      {
        path: 'Customer',
        element: <Customer />
      },
      {
        path: 'Agentpayment',
        element: <Agentpayment />
      },
      {
        path: 'PurchaseInChina',
        element: <PurchaseInChina />
      },
      {
        path: 'stockhouse',
        element: <Stockhouse />
      },
      {
        path: 'Recovery',
        element: <Recovery />
      },
      {
        path: 'login', // Existing login route
        element: <Login />
      },
      {
        path: 'Logout', // New signin route
        element: <Logout /> // Route to the same Login component or another component if needed
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
