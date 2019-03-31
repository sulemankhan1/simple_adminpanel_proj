import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <Router>
        <nav className="header-navbar navbar navbar-with-menu navbar-fixed-top navbar-semi-dark navbar-shadow">
          <div className="navbar-wrapper">
            <div className="navbar-header">
              <ul className="nav navbar-nav">
                <li className="nav-item mobile-menu hidden-md-up float-xs-left">
                  <Link
                    to="/admin/"
                    className="nav-link nav-menu-main menu-toggle hidden-xs"
                  >
                    <i className="icon-menu5 font-large-1" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/" className="navbar-brand nav-link">
                    <h2 class="logo-text">Admin Panel</h2>
                  </Link>
                </li>
                <li className="nav-item hidden-md-up float-xs-right">
                  <Link to="/" className="nav-link open-navbar-container">
                    <i className="icon-ellipsis pe-2x icon-icon-rotate-right-right" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-container content container-fluid">
              <div id="navbar-mobile" className="collapse navbar-toggleable-sm">
                <ul className="nav navbar-nav">
                  <li className="nav-item hidden-sm-down">
                    <Link
                      to="/"
                      className="nav-link nav-menu-main menu-toggle hidden-xs"
                    >
                      <i className="icon-menu5" />
                    </Link>
                  </li>
                </ul>
                <ul className="nav navbar-nav float-xs-right logout-btn">
                  <Link to="/" className="nav-link">
                    <span className="user-name">Logout</span>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </Router>
    );
  }
}

export default Navbar;
