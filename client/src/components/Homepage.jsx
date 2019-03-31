import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import "./custom.css";

class Homepage extends Component {
  state = {
    total_categories: 0,
    total_products: 0,
    total_users: 0
  };

  constructor(props) {
    super(props);

    this.getCounters();
  }

  getCounters = () => {
    // categories
    axios.get("/api/categories/").then(res => {
      if (res.data.success === true) {
        this.setState({ total_categories: res.data.data.length });
      }
    });
    // products
    axios.get("/api/products/").then(res => {
      if (res.data.success === true) {
        this.setState({ total_products: res.data.data.length });
      }
    });
    // users
    const instance = axios.create({
      timeout: 1000,
      headers: { Authorization: localStorage.user_token }
    });

    instance.get("/api/users/").then(res => {
      if (res.data.success === true) {
        this.setState({ total_users: res.data.data.length });
      } else {
        alert(res.data.msg);
      }
    });
  };

  render() {
    const { total_categories, total_products, total_users } = this.state;
    return (
      <Router>
        <div
          className="app-content content container-fluid"
          style={this.styles}
        >
          <div className="content-wrapper">
            <div className="content-header row" />
            <div className="content-body">
              <div className="row">
                <div className="col-xs-12">
                  <div className="card">
                    <div className="card-body" />
                    <div className="card-block">
                      <h1>Dashboard</h1>
                      <p>
                        Simple Admin Panel with products / Categories / Users
                        Models
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-block">
                        <div className="row">
                          <div className="col-xl-4 col-lg-6 col-sm-12 border-right-blue-grey border-right-lighten-5">
                            <div className="media px-1">
                              <div className="media-left media-middle">
                                <i className="icon-box font-large-1 blue-grey" />
                              </div>
                              <div className="media-body text-xs-right">
                                <span className="font-large-2 text-bold-300 info">
                                  {total_categories}
                                </span>
                              </div>
                              <p className="text-muted">Total Categories </p>
                              <progress
                                className="progress progress-sm progress-info"
                                value="80"
                                max="100"
                              />
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-sm-12 border-right-blue-grey border-right-lighten-5">
                            <div className="media px-1">
                              <div className="media-left media-middle">
                                <i className="icon-tag3 font-large-1 blue-grey" />
                              </div>
                              <div className="media-body text-xs-right">
                                <span className="font-large-2 text-bold-300 deep-orange">
                                  {total_products}
                                </span>
                              </div>
                              <p className="text-muted">Total Products</p>
                              <progress
                                className="progress progress-sm progress-deep-orange"
                                value="45"
                                max="100"
                              />
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-sm-12 border-right-blue-grey border-right-lighten-5">
                            <div className="media px-1">
                              <div className="media-left media-middle">
                                <i className="icon-shuffle3 font-large-1 blue-grey" />
                              </div>
                              <div className="media-body text-xs-right">
                                <span className="font-large-2 text-bold-300 danger">
                                  {total_users}
                                </span>
                              </div>
                              <p className="text-muted">Total Users</p>
                              <progress
                                className="progress progress-sm progress-danger"
                                value="75"
                                max="100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Homepage;
