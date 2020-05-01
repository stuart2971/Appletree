import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"

// import './App.css';
// import './src/semantic.less';


import Home from "./components/Home/Home.component"
import Orders from "./components/Orders/Orders.component"

function App() {
  return (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/ShowOrders/:id" component={Orders} />
    </Router>
  );
}

export default App;
