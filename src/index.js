import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import Device from './routes/Devices';
import Error from './routes/Error.js';
import Stock from './routes/Stock';
import Suppliers from './routes/Suppliers';
import Items from './routes/Items';
import UpdateStock from './routes/UpdateStock';
import UpdateItem from './routes/UpdateItem';
import UpdateSupplier from './routes/UpdateSupplier';
import StockCount from './routes/StockCount';
import PrintCode from './routes/PrintCode';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <h1>Error</h1>,
  }, 
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/device',
    element: <Device />,
  },
  {
    path: '/error',
    element: <Error />,
  }, 
  {
    path: '/stock',
    element: <Stock />,
  }, 
  {
    path: '/supplier',
    element: <Suppliers />,
  }, 
  {
    path: '/items',
    element: <Items />,
  }, 
  {
    path: '/updateStock/:id',
    element: <UpdateStock />,
  }, 
  {
    path: '/updateItem/:id',
    element: <UpdateItem />,
  },
  {
    path: '/updateSupplier/:id',
    element: <UpdateSupplier />,
  }, 
  {
    path: '/stockCount',
    element: <StockCount />,
  }, 
  
  {
    path: '/printCode/:id',
    element: <PrintCode />,
  }, 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
