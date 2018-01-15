import React from "react";
import "../VehicleDetail.css";
import Navbar from "../Navbar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles.vehicles
  };
};

class VehicleDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Make: "",
      Model: "",
      Year: "",
      Color: "",
      VehicleType: "",
      RetailPrice: ""
    };

    this.handleMake = this.handleMake.bind(this);
    this.handleModel = this.handleModel.bind(this);
    this.handleYear = this.handleYear.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleVehicleType = this.handleVehicleType.bind(this);
    this.handleRetailPrice = this.handleRetailPrice.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
  }

  handleMake(event) {
    this.setState({
      Make: event.target.value
    });
  }

  handleModel(event) {
    this.setState({
      Model: event.target.value
    });
  }

  handleYear(event) {
    this.setState({
      Year: event.target.value
    });
  }

  handleColor(event) {
    this.setState({
      Color: event.target.value
    });
  }

  handleVehicleType(event) {
    this.setState({
      VehicleType: event.target.value
    });
  }

  handleRetailPrice(event) {
    this.setState({
      RetailPrice: event.target.value
    });
  }

  handleSaveButton() {
    // determine whether edit or new and then post or put
    if (this.props.match.params.id === undefined) {
      axios
        .post("/api/vehicles", {
          Make: this.state.Make,
          Model: this.state.Model,
          Year: parseInt(this.state.Year, 10),
          Color: this.state.Color,
          VehicleType: this.state.VehicleType,
          RetailPrice: parseFloat(this.state.RetailPrice)
        })
        .then(() => {
          const { dispatch } = this.props;
          const ApiCall = {
            type: "GET",
            payload: axios.get("api/vehicles")
          };
          dispatch(ApiCall);
        });
    } else {
      axios
        .put(`/api/vehicles/${this.props.match.params.id}`, {
          Make: this.state.Make,
          Model: this.state.Model,
          Year: parseInt(this.state.Year, 10),
          Color: this.state.Color,
          VehicleType: this.state.VehicleType,
          RetailPrice: parseFloat(this.state.RetailPrice)
        })
        .then(() => {
          const { dispatch } = this.props;
          const ApiCall = {
            type: "GET",
            payload: axios.get("api/vehicles")
          };
          dispatch(ApiCall);
        });
    }
  }

  componentDidMount() {
    if(this.props.match.params.id !== undefined) {
    axios
      .get(`/api/vehicles/${this.props.match.params.id}`)
      .then(vehicle => {
        this.setState({
          Make: vehicle.data.Make,
          Model: vehicle.data.Model,
          Year: vehicle.data.Year,
          Color: vehicle.data.Color,
          VehicleType: vehicle.data.VehicleType,
          RetailPrice: vehicle.data.RetailPrice
        });
      });
    }
  }

  render() {
    var addEdit;
    if (this.props.match.params.id === undefined) {
      addEdit = "Add Vehicle";
    } else {
      addEdit = "Edit Vehicle";
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
                    <strong>Make</strong>
                  </h6>
                  <input
                    value={this.state.Make}
                    type="text"
                    className="vd-input-left form-control"
                    onChange={this.handleMake}
                  />
                </div>
                <div className="vd-strong-input">
                  <h6>
                    <strong>Model</strong>
                  </h6>
                  <input
                    value={this.state.Model}
                    type="text"
                    className="vd-input-right form-control"
                    onChange={this.handleModel}
                  />
                </div>
              </div>
              <div className="vd-strong-input-parent">
                <div className="vd-strong-input">
                  <h6>
                    <strong>Year</strong>
                  </h6>
                  <input
                    value={this.state.Year}
                    type="number"
                    className="vd-input-left form-control"
                    onChange={this.handleYear}
                  />
                </div>
                <div className="vd-strong-input">
                  <h6>
                    <strong>Color</strong>
                  </h6>
                  <input
                    value={this.state.Color}
                    type="text"
                    className="vd-input-right form-control"
                    onChange={this.handleColor}
                  />
                </div>
              </div>
              <div className="vd-strong-input-parent">
                <div className="vd-strong-input">
                  <h6>
                    <strong>Vehicle Type</strong>
                  </h6>
                  <input
                    value={this.state.VehicleType}
                    type="text"
                    className="vd-input-left form-control"
                    onChange={this.handleVehicleType}
                  />
                </div>
                <div className="vd-strong-input">
                  <h6>
                    <strong>Retail Price</strong>
                  </h6>
                  <input
                    value={this.state.RetailPrice}
                    type="number"
                    className="vd-input-right form-control"
                    onChange={this.handleRetailPrice}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/vehicles/grid">
                <button
                  onClick={this.handleSaveButton}
                  className="btn btn-default vd-save-button"
                >
                  Save<i className="fa fa-download" aria-hidden="true" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(VehicleDetail));
