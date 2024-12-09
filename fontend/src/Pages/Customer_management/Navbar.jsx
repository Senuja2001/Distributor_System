import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faChartLine } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  return (
    <div className="navbar-container">
      {/* Top section with title and user info */}
      <div className="top-bar d-flex justify-content-between align-items-center">
        <div className="system-title">Distributor Management System</div>
        <div className="user-info d-flex align-items-center">
          <div className="text-right">
            <div>Welcome User</div>
            <div>Last Login: 15/07/2024 12:51:22</div>
          </div>
          <img src="/path-to-profile-image.jpg" alt="User Profile" className="profile-pic" />
          <FontAwesomeIcon icon={faUser} className="ml-3 arrow-icon" />
        </div>
      </div>

      {/* Navbar Links */}
      <nav className="navbar navbar-expand-lg navbar-links">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact activeclassname="active-link">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />&nbsp;&nbsp;&nbsp;Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/add-customer" activeclassname="active-link">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />&nbsp;&nbsp;&nbsp;Add Customer
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/reports" activeclassname="active-link">
                  <FontAwesomeIcon icon={faChartLine} className="mr-2" />&nbsp;&nbsp;&nbsp;Reports
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
