import React from "react";
import "../VehicleGrid.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axios from "axios";

const mapStateToProps = state => {
  return {
    customers: state.vehicles.vehicles
  };
};

class CustomerGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: []
    };

    this.handleDeleteButton = this.handleDeleteButton.bind(this);
  }
  // Needs redux
  componentDidMount() {
    const { dispatch } = this.props;
    const ApiCall = {
      type: "GET",
      payload: axios.get("/api/customers")
    };
    dispatch(ApiCall);
  }

  handleDeleteButton(id) {
    axios
      .put(`/api/customers/${id}`, {
        DeleteDate: new Date()
      })
      .then(() => {
        const { dispatch } = this.props;
        const ApiCall = {
          type: "GET",
          payload: axios.get("/api/customers")
        };
        dispatch(ApiCall);
      });
  }

  renderCustomers() {
    return this.props.customers.map(customer => {
      if (customer.DeleteDate === null) {
        return (
          <tr key={customer.id}>
            <td>{customer.FirstName}</td>
            <td>{customer.LastName}</td>
            <td>{customer.EmailAddress}</td>
            <td>{customer.Telephone}</td>
            <td>
              <Link to={`/customers/detail/${customer.id}`}>
                <button className="pencil-button">
                  <i className="fa fa-pencil" aria-hidden="true" />
                </button>
              </Link>
              <button
                className="trash-button"
                onClick={() => this.handleDeleteButton(customer.id)}
              >
                <i className="fa fa-trash" aria-hidden="true" />
              </button>
            </td>
          </tr>
        );
      }
    });
  }

  render() {
    return (
      <div className="vg">
        <div className="vg-header cf">
          <h4 className="vg-header-in">Vehicle Manager</h4>
          <h6 className="vg-header-in vg-non-header">
            <Link to="/" className="vg-links">
              Dashboard
            </Link>
          </h6>
          <h6 className="vg-header-in vg-non-header">
            <Link to="/customers/grid" className="vg-links">
              Customers
            </Link>
          </h6>
          <h6 className="vg-header-in vg-non-header">
            <Link to="/sales/grid" className="vg-links">
              Sales
            </Link>
          </h6>
          <h6 className="vg-header-in vg-non-header">
            <Link to="/vehicles/grid" className="vg-links">
              Vehicles
            </Link>
          </h6>
        </div>
        <div>
          <Link to="/customers/detail">
            <button className="btn vg-button">
              <i className="fa fa-plus" aria-hidden="true" /> Add Customer
            </button>
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="vg-border">First Name</th>
              <th className="vg-border">Last Name</th>
              <th className="vg-border">Email Address</th>
              <th className="vg-border">Telephone</th>
            </tr>
          </thead>
          <tbody>
            {this.renderCustomers()}
          </tbody>
        </table>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps)(CustomerGrid));
