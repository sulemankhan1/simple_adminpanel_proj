import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
// import "./AddProducts.css";
import "./login-register.min.css";

// Components

class Login extends Component {
  state = {
    email: "khan@email.com",
    password: "khan"
  };

  onSubmit = e => {
    const that = this;
    e.preventDefault();
    // var bodyFormData = new FormData();
    // console.log(this.state.email);
    // bodyFormData.set("email", this.state.email);
    // bodyFormData.set("password", this.state.password);

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    // Post to Server
    axios.post("/api/users/login", userData).then(function(res) {
      //handle success

      if (res.data.success === true) {
        localStorage.setItem("user_token", res.data.token);
        alert(res.data.msg);
        that.props.history.push("/admin/");
      } else {
        alert("Something went Wrong!");
      }
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Router>
        <div class="content-wrapper">
          <div class="content-header row" />
          <div class="content-body">
            <section class="flexbox-container">
              <div className="col-md-4 offset-md-4 col-xs-10 offset-xs-1  box-shadow-2 p-0">
                <div className="card border-grey border-lighten-3 m-0">
                  <div className="card-header no-border">
                    <div className="card-title text-xs-center">
                      <div className="p-1">
                        <img
                          src="../../../app-assets/images/logo/robust-logo-dark.png"
                          alt="branding logo"
                        />
                      </div>
                    </div>
                    <h6 className="card-subtitle line-on-side text-muted text-xs-center font-small-3 pt-2">
                      <span>Login to Admin Panel</span>
                    </h6>
                  </div>
                  <div className="card-body collapse in">
                    <div className="card-block">
                      <form className="form-horizontal form-simple">
                        <fieldset className="form-group position-relative has-icon-left mb-0">
                          <input
                            type="text"
                            className="form-control form-control-lg input-lg"
                            id="email"
                            placeholder="Your email"
                            name="email"
                            onChange={e => {
                              this.setState({ email: e.target.value });
                            }}
                            value={email}
                            required
                          />
                          <div className="form-control-position">
                            <i className="icon-head" />
                          </div>
                        </fieldset>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="password"
                            className="form-control form-control-lg input-lg"
                            id="user-password"
                            placeholder="Enter Password"
                            name="password"
                            onChange={e => {
                              this.setState({ password: e.target.value });
                            }}
                            value={password}
                            required
                          />
                          <div className="form-control-position">
                            <i className="icon-key3" />
                          </div>
                        </fieldset>
                        {/* <fieldset className="form-group row">
                          <div className="col-md-6 col-xs-12 text-xs-center text-md-left">
                            <fieldset>
                              <input
                                type="checkbox"
                                id="remember-me"
                                className="chk-remember"
                              />
                              <label for="remember-me"> Remember Me</label>
                            </fieldset>
                          </div>
                          <div className="col-md-6 col-xs-12 text-xs-center text-md-right">
                            <a
                              href="recover-password.html"
                              className="card-link"
                            >
                              Forgot Password?
                            </a>
                          </div>
                        </fieldset> */}
                        <button
                          type="button"
                          className="btn btn-primary btn-lg btn-block"
                          onClick={this.onSubmit}
                        >
                          <i className="icon-unlock2" /> Login
                        </button>
                      </form>
                    </div>
                  </div>
                  {/* <div className="card-footer">
                    <div className="">
                      <p className="float-sm-left text-xs-center m-0">
                        <a href="recover-password.html" className="card-link">
                          Recover password
                        </a>
                      </p>
                      <p className="float-sm-right text-xs-center m-0">
                        New to Robust?{" "}
                        <a href="register-simple.html" className="card-link">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </section>
          </div>
        </div>
      </Router>
    );
  }
}

export default Login;
