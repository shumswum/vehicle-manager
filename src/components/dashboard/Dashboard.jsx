import React from "react";
import "./Dashboard.css";
import Navbar from "../Navbar.jsx";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
      </div>
    );
  }
}

export default Dashboard;
