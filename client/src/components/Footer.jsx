import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Footer extends Component {
  state = {};
  render() {
    return (
      <Router>
        <footer className="footer footer-static footer-light navbar-border">
          <p className="clearfix text-muted text-sm-center mb-0 px-2">
            <span className="float-md-left d-xs-block d-md-inline-block">
              Developed with <i class="icon-heart" /> by{" "}
              <strong>Suleman khan</strong>
            </span>
          </p>
        </footer>
      </Router>
    );
  }
}

export default Footer;
