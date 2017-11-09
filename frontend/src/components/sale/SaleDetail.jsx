import React from "react";
import "../VehicleDetail.css";
import { Link } from "react-router-dom";

class SaleDetail extends React.Component {
  render() {
    var addEdit;
    if (this.props.match.params.id === undefined) {
      addEdit = "Add Sale";
    } else {
      addEdit = "Edit Sale";
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
                  <h6>
                    <strong>Customer</strong>
                  </h6>
                  <input type="text" className="vd-input-left form-control" />
                </div>
                <div className="vd-strong-input">
                  <h6>
                    <strong>Vehicle</strong>
                  </h6>
                  <input type="text" className="vd-input-right form-control" />
                </div>
              </div>
              <div className="vd-strong-input-parent">
                <div className="vd-strong-input">
                  <h6>
                    <strong>Invoice Date</strong>
                  </h6>
                  <input type="number" className="vd-input-left form-control" />
                </div>
                <div className="vd-strong-input">
                  <h6>
                    <strong>Payment Received Date</strong>
                  </h6>
                  <input type="text" className="vd-input-right form-control" />
                </div>
              </div>
              <div className="vd-strong-input-parent">
                <div className="vd-strong-input">
                  <h6>
                    <strong>Sale Price</strong>
                  </h6>
                  <input type="number" className="vd-input-left form-control" />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-default vd-save-button">
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
