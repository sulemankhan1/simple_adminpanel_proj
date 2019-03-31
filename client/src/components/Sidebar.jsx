import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  state = {};
  render() {
    return (
      <div className="main-menu menu-fixed menu-dark menu-accordion menu-shadow">
        <div className="main-menu-content">
          <ul id="main-menu-navigation" className="navigation navigation-main">
            <li className=" nav-item">
              <Link to="/admin/">
                <i className="icon-home3" />
                <span className="menu-title">Dashboard</span>
              </Link>
            </li>
            <li className=" nav-item">
              <Link to="/admin/categories">
                <i className="icon-home3" />
                <span className="menu-title">Categories</span>
              </Link>
            </li>
            <li className=" nav-item">
              <Link to="/admin/products">
                <i className="icon-home3" />
                <span className="menu-title">Products</span>
              </Link>
            </li>
            <li className=" nav-item">
              <Link to="/admin/users">
                <i className="icon-home3" />
                <span className="menu-title">Users</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
