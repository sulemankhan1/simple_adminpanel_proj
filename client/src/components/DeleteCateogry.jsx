import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./custom.css";

class Homepage extends Component {
  state = {};

  render() {
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
