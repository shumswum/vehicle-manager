import React from "react";
import "../VehicleGrid.css";
import Navbar from "../Navbar.jsx";
import { Link } from 'react-router-dom';

class SaleGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sales: []
    };

    this.handleDeleteButton = this.handleDeleteButton.bind(this);
  }

  //Needs functioning edit button and delete button and will need the detail page built with custom css
  // and functionality different from other detail pages

  componentDidMount() {
    fetch("/api/sales", { accept: "application/json" })
      .then(s => s.json())
      .then(sales => {
        this.setState({ sales });
        console.log(sales);
      });
  }

  renderSales() {
    return this.state.sales.map(sale => {
      return (
        <tr key={sale.id}>
          <td>{`${sale.Customer.FirstName} ${sale.Customer.LastName}`}</td>
          <td>{`${sale.Vehicle.Make} ${sale.Vehicle.Model}`}</td>
          <td>{sale.InvoiceDate}</td>
          <td>{sale.PaymentReceivedDate}</td>
          <td>{sale.SalePrice}</td>
          <td>
            <Link to={`/sales/detail/${sale.id}`}><button className="pencil-button"><i className="fa fa-pencil" aria-hidden="true"></i></button></Link>
          <button className="trash-button"><i className="fa fa-trash" aria-hidden="true"></i></button>
          </td>
        </tr>
      );
    });
  }

  handleDeleteButton() {

  }

  render() {
    return (
      <div className="vg">
        <Navbar/>
        <div>
          <Link to="/sales/detail"><button className="btn vg-button"><i className="fa fa-plus" aria-hidden="true"></i> Add Sale</button></Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="vg-border">Customer Name</th>
              <th className="vg-border">Vehicle</th>
              <th className="vg-border">Invoiced?</th>
              <th className="vg-border">Paid?</th>
              <th className="vg-border">Sales Price</th>
            </tr>
          </thead>
          <tbody>
            {this.renderSales()}
          </tbody>
        </table>
      </div>
    );
  }
}
export default SaleGrid;
