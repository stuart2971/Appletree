import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"

import Home from "./components/Home/Home.component"
import AdminOrderForm from "./components/AdminOrderForm/AdminOrderForm.component"
import OrderRouter from "./components/Orders/OrderRouter.component"

function App() {  
    return (
      <Router>
          <Route path="/" exact component={Home} />
          <Route path="/admin/ShowOrders/password" component={OrderRouter} />
          <Route path="/admin/OrderForm/password" component={AdminOrderForm} />
          <Route path="/ShowOrders/:id" component={OrderRouter} />
      </Router>
    );
}


export default App;