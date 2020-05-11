//When starting the web app from local machine, you have to start the server first, then client

import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"

import Home from "./components/Home/Home.component"
import OrderRouter from "./components/Orders/OrderRouter.component"

function App() {  
    return (
      <Router>
          <Route path="/" exact component={Home} />
          <Route path="/admin/password" component={OrderRouter} />
          <Route path="/ShowOrders/:id" component={OrderRouter} />
      </Router>
    );
}


export default App;
