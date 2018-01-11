import React, { Component } from 'react';
import VehicleGrid from './components/vehicle/VehicleGrid.jsx';
import VehicleDetail from './components/vehicle/VehicleDetail.jsx';
import CustomerGrid from './components/customer/CustomerGrid.jsx';
import CustomerDetail from './components/customer/CustomerDetail.jsx';
import SaleGrid from './components/sale/SaleGrid';
import SaleDetail from './components/sale/SaleDetail';
import Dashboard from './components/dashboard/Dashboard';
import { HashRouter as Router,
        Route
      } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: []
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={ Dashboard }/>
          <Route path='/vehicles/grid' component={ VehicleGrid }/>
          <Route path='/vehicles/detail/:id' component={ VehicleDetail }/>
          <Route exact path='/vehicles/detail' component={ VehicleDetail }/>
          <Route path='/customers/grid' component={ CustomerGrid }/>
          <Route path='/customers/detail/:id' component={ CustomerDetail }/>
          <Route exact path='/customers/detail' component={ CustomerDetail }/>
          <Route path='/sales/grid' component={ SaleGrid }/>
          <Route path='/sales/detail/:id' component={ SaleDetail }/>
          <Route exact path='/sales/detail' component={ SaleDetail }/>
        </div>
      </Router>
    );
  }
}

export default App;
