import React from "react";
import "./Dashboard.css";
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Dashboard;
