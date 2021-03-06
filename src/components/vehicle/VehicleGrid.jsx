import React from "react";
import "../VehicleGrid.css";
import Navbar from "../Navbar.jsx";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios";

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles.vehicles
  };
};

class VehicleGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: []
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    const ApiCall = {
      type: "GET",
      payload: axios.get("/api/vehicles")
    };

    dispatch(ApiCall);
  }

  handleDeleteButton(id) {
    axios
      .put(`/api/vehicles/${id}`, {
        DeleteDate: new Date()
      }).then(() => {
        const { dispatch } = this.props;
        const ApiCall = {
          type: 'GET',
          payload: axios.get('/api/vehicles')
        }
        dispatch(ApiCall);
      });
  }

  renderVehicles() {
    return this.props.vehicles.map(vehicle => {
      if (vehicle.DeleteDate === null) {
        return (
          <tr key={vehicle.id}>
            <td>{vehicle.Make}</td>
            <td>{vehicle.Model}</td>
            <td>{vehicle.VehicleType}</td>
            <td>{vehicle.Year}</td>
            <td>{vehicle.Color}</td>
            <td>{vehicle.RetailPrice}</td>
            <td>
              <Link to={`/vehicles/detail/${vehicle.id}`}>
                <button className="pencil-button">
                  <i className="fa fa-pencil" aria-hidden="true" />
                </button>
              </Link>
              <button onClick={() => this.handleDeleteButton(vehicle.id)} className="trash-button">
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
        <Navbar/>
        <div>
          <Link to="/vehicles/detail">
            <button className="btn vg-button">
              <i className="fa fa-plus" aria-hidden="true" /> Add Vehicle
            </button>
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="vg-border">Make</th>
              <th className="vg-border">Model</th>
              <th className="vg-border">Type</th>
              <th className="vg-border">Year</th>
              <th className="vg-border">Color</th>
              <th className="vg-border">Price</th>
            </tr>
          </thead>
          <tbody>{this.renderVehicles()}</tbody>
        </table>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps)(VehicleGrid));
