import React from "react";
import "../VehicleDetail.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = state => {
  return {
    customers: state.customers.customers
  };
};

// need save button functionality and post info depending
// on whether there is an id parameter

class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      FirstName: '',
      LastName: '',
      Email: '',
      Telephone: ''
    }

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleTelephone = this.handleTelephone.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.id !== undefined) {
    axios
      .get(`api/customers/${this.props.match.params.id}`)
      .then(customers => {
        console.log(customers)
        this.setState({
          FirstName: customers.data.FirstName,
          LastName: customers.data.LastName,
          Email: customers.data.EmailAddress,
          Telephone: customers.data.Telephone
        });
      });
    }
  }

  handleFirstName(event) {
    this.setState({
      FirstName: event.target.value
    });
  }

  handleLastName(event) {
    this.setState({
      LastName: event.target.value
    });
  }

  handleEmail(event) {
    this.setState({
      Email: event.target.value
    });
  }

  handleTelephone(event) {
    this.setState({
      Telephone: event.target.value
    });
  }

  handleSaveButton() {
    if (this.props.match.params.id === undefined) {
      axios
        .post("/api/customers", {
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          EmailAddress: this.state.Email,
          Telephone: this.state.Telephone
        })
        .then(() => {
          const { dispatch } = this.props;
          const ApiCall = {
            type: "GET",
            payload: axios.get("api/customers")
          };
          dispatch(ApiCall);
        });
    } else {
      axios
        .put(`/api/customers/${this.props.match.params.id}`, {
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          EmailAddress: this.state.Email,
          Telephone: this.state.Telephone
        })
        .then(() => {
          const { dispatch } = this.props;
          const ApiCall = {
            type: "GET",
            payload: axios.get("api/customers")
          };
          dispatch(ApiCall);
        });
    }
  }

  render() {
    var addEdit;
    if (this.props.match.params.id === undefined) {
      addEdit = "Add Customer";
    } else {
      addEdit = "Edit Customer";
    }

    return (
      <div className="vd">
        <div className="vd-header cf">
          <h4 className="vd-header-in">Vehicle Manager</h4>
          <h6 className="vd-header-in vd-non-header">
            <Link to="/" className="vd-links">
              Dashboard
            </Link>
          </h6>
          <h6 className="vd-header-in vd-non-header">
            <Link to="/customers/grid" className="vd-links">
              Customers
            </Link>
          </h6>
          <h6 className="vd-header-in vd-non-header">
            <Link to="/sales/grid" className="vd-links">
              Sales
            </Link>
          </h6>
          <h6 className="vd-header-in vd-non-header">
            <Link to="/vehicles/grid" className="vd-links">
              Vehicles
            </Link>
          </h6>
        </div>
        <div>
          <div className="card">
            <div className="card-header">{addEdit}</div>
            <div className="card-body">
              <div className="vd-strong-input-parent">
                <div className="vd-strong-input">
                  <h6><strong>First Name</strong></h6>
                  <input onChange={this.handleFirstName} value={this.state.FirstName} type="text" className="vd-input-left form-control" />
                </div>
                <div className="vd-strong-input">
                <h6><strong>Last Name</strong></h6>
                  <input onChange={this.handleLastName} value={this.state.LastName} type="text" className="vd-input-right form-control" />
                </div>
              </div>
              <div className="vd-strong-input-parent">
                <div className="vd-strong-input">
                <h6><strong>Email</strong></h6>
                  <input onChange={this.handleEmail} value={this.state.Email} type="text" className="vd-input-left form-control" />
                </div>
              </div>
              <div className="vd-strong-input-parent">
                <div className="vd-strong-input">
                <h6><strong>Telephone</strong></h6>
                  <input onChange={this.handleTelephone} value={this.state.Telephone} type="text" className="vd-input-left form-control" />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/customers/grid"><button onClick={this.handleSaveButton} className="btn btn-default vd-save-button">Save<i className="fa fa-download" aria-hidden="true"></i></button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(CustomerDetail));
