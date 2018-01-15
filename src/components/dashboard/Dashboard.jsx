import React from "react";
import "./Dashboard.css";
import Navbar from "../Navbar.jsx";
import axios from "axios";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: [],
      customers: [],
      sales: [],
      vehicleStock: 0,
      currentCustomers: 0,
      totalSales: 0,
      revenue: 0,
      avgVehicle: 0,
      pendingSales: 0
    };
  }

  componentWillMount() {
    axios
      .all([
        axios.get("/api/sales"),
        axios.get("/api/customers"),
        axios.get("/api/vehicles")
      ])
      .then(
        axios.spread((sales, customers, vehicles) => {
          this.setState({
            vehicles: vehicles.data,
            sales: sales.data,
            customers: customers.data
          });
        })
      )
      .then(() => {
        this.vehicleStock();
        this.currentCustomers();
        this.totalSales();
        this.avgVehicle();
        this.revenue();
        this.pendingSales();
      })
      .catch(err => console.log(err));
  }

  pendingSales() {
    let pendingSales = 0;

    if(this.state.sales.length) {
      this.state.sales.map(sale => {
        if(sale.PaymentReceivedDate === null) {
          pendingSales++;
        }
      });
    }
    this.setState({pendingSales});
  }

  revenue() {
    let revenue = 0;

    if(this.state.sales.length) {
      this.state.sales.map(sale => {
        if(sale.PaymentReceivedDate != null) {
          revenue += sale.SalePrice;
        }
      });
    }
    revenue = revenue.toFixed(2);
    this.setState({revenue});
  }

  avgVehicle() {
    let totalVehicle = 0;
    let avgVehicle;

    if(this.state.vehicles.length) {
      this.state.vehicles.map(vehicle => {
        if(vehicle.DeleteDate === null) {
          totalVehicle += vehicle.RetailPrice
        }
      });
    }

    avgVehicle = (totalVehicle / this.state.vehicleStock).toFixed(2);

    this.setState({avgVehicle});
  }

  totalSales() {
    let totalSales = 0;

    if (this.state.sales.length) {
      this.state.sales.map(sale => {
        if (sale.DeleteDate === null) {
          totalSales++;
        }
      });
    }

    this.setState({totalSales});
  }

  currentCustomers() {
    let currentCustomers = 0;

    if (this.state.customers.length) {
      this.state.customers.map(customer => {
        if (customer.DeleteDate === null) {
          currentCustomers++;
        }
      });
    }

    this.setState({currentCustomers});
  }

  vehicleStock() {
    let vehicleStock = 0;

    if (this.state.vehicles.length) {
      this.state.vehicles.map(vehicle => {
        if (vehicle.DeleteDate === null) {
          vehicleStock++;
        }
      });
    }
    this.setState({
      vehicleStock
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <h3 className="welcome">Welcome to Vehicle Manager!</h3>
        <h5 className="description">
          You can use this app to keep track of customers, vehicles, and sales<br />for
          a dealership. Below you can find cumulative statistics about your
          dealership.
        </h5>
        <div className="top">
          <div className="vehicles">
            <h5>Vehicles In Stock</h5>
            <h1 className="content-sizing">{this.state.vehicleStock}</h1>
          </div>
          <div className="customers">
            <h5>Current Active Customers</h5>
            <h1 className="content-sizing">{this.state.currentCustomers}</h1>
          </div>
          <div className="sales">
            <h5>Total Sales</h5>
            <h1 className="content-sizing">{this.state.totalSales}</h1>
          </div>
        </div>
        <div className="bottom">
          <div className="vehicle-cost">
            <h5>Average Vehicle Cost</h5>
            <h1 className="content-sizing">${this.state.avgVehicle}</h1>
          </div>
          <div className="pending-sales">
            <h5>Sales Awaiting Payment</h5>
            <h1 className="content-sizing">{this.state.pendingSales}</h1>
          </div>
          <div className="revenue">
            <h5>Total Revenue</h5>
            <h1 className="content-sizing">${this.state.revenue}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
