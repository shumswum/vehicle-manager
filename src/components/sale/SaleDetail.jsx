import React from "react";
import "react-select/dist/react-select.css";
import "../VehicleDetail.css";
import Navbar from "../Navbar.jsx";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

class SaleDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: [],
      vehicle: [],
      invoiceDate: "",
      paymentReceived: "",
      salePrice: "",
      customerValue: '',
      vehicleValue: ''
    };

    this.renderVehicleSelect = this.renderVehicleSelect.bind(this);
    this.renderCustomerSelect = this.renderCustomerSelect.bind(this);
    this.handleVehicleChange = this.handleVehicleChange.bind(this);
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    let customer, vehicle;
    axios
      .get("/api/customers/")
      .then(customers => {
        customer = customers.data;
        axios
          .get("/api/vehicles")
          .then(vehicles => {
            vehicle = vehicles.data;
            this.setState({
              customer,
              vehicle
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  handleVehicleChange(e) {
    this.setState({
      vehicleValue: e.value
    });
  }

  handleCustomerChange(e) {
    this.setState({
      customerValue: e.value
    });
  }

  handleInput(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSave() {
    axios
        .post('api/sales/', {
          "SalePrice": this.state.salePrice,
          "InvoiceDate": this.state.invoiceDate,
          "PaymentRecievedDate": this.state.paymentReceived,
          "vehicle_id": this.state.vehicleValue,
          "customer_id": this.state.customerValue
        })
        .then(() => this.props.history.push('/sales/grid'))
        .catch(err => console.log(err));
  }

  renderVehicleSelect() {
    let options = [];

    if (this.state.vehicle.length) {
      this.state.vehicle.map(current => {
        if (current.DeleteDate === null) {
          options.push({
            value: current.id,
            label: `${current.Year} ${current.Make} ${current.Model}`
          });
          return true;
        } else {
          return false;
        }
      });
    }

    return <Select className="react-select" value={this.state.vehicleValue} options={options} onChange={this.handleVehicleChange}/>;
  }

  renderCustomerSelect() {
    let options = [];

    if (this.state.customer.length) {
      this.state.customer.map(current => {
        if (current.DeleteDate === null) {
          options.push({
            value: current.id,
            label: `${current.FirstName} ${current.LastName} ${
              current.EmailAddress
            }`
          });
          return true;
        } else {
          return false;
        }
      });
    }

    return <Select className="react-select" value={this.state.customerValue} options={options} onChange={this.handleCustomerChange}/>;
  }

  render() {
    var addEdit;
    if (this.props.match.params.id === undefined) {
      addEdit = "Add Sale";
    } else {
      addEdit = "Edit Sale";
    }

    return (
      <div className="vd">
        <Navbar/>
        <div>
          <div className="card">
            <div className="card-header">{addEdit}</div>
            <div className="card-body">
              <div className="vd-strong-input-parent">
                <div className="vd-strong-input">
                  <h6>
                    <strong>Customer</strong>
                  </h6>
                  {this.renderCustomerSelect()}
                </div>
                <div className="vd-strong-input">
                  <h6>
                    <strong>Vehicle</strong>
                  </h6>
                  {this.renderVehicleSelect()}
                </div>
              </div>
              <div className="vd-strong-input-parent">
                <div className="vd-strong-input">
                  <h6>
                    <strong>Invoice Date</strong>
                  </h6>
                  <input id="invoiceDate" value={this.state.invoiceDate} className="vd-input-left form-control" onChange={this.handleInput}/>
                </div>
                <div className="vd-strong-input">
                  <h6>
                    <strong>Payment Received Date</strong>
                  </h6>
                  <input id="paymentReceived" value={this.state.paymentReceived} className="vd-input-right form-control" onChange={this.handleInput}/>
                </div>
              </div>
              <div className="vd-strong-input-parent">
                <div className="vd-strong-input">
                  <h6>
                    <strong>Sale Price</strong>
                  </h6>
                  <input id="salePrice" value={this.state.salePrice} type="number" className="vd-input-left form-control sale-price" onChange={this.handleInput}/>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-default vd-save-button" onClick={this.handleSave}>
                Save<i className="fa fa-download" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SaleDetail;
