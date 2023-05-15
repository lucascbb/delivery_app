import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import admin from './pages/Admin';
import Register from './pages/Register';
import CustomerOrders from './pages/CustomerOrders';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import SellerOrders from './pages/SellerOrders';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/admin/manage" component={ admin } />
      <Route exact path="/customer/orders" component={ CustomerOrders } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders/:id" component={ Orders } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/seller/orders/:id" component={ OrderDetails } />
    </Switch>
  );
}

export default App;
