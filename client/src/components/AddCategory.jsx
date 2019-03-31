import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AddProducts.css";

// Components

class AddCategory extends Component {
  state = {
    name: ""
  };

  submitForm = e => {
    e.preventDefault();
    const that = this;
    let bodyFormData = new FormData();
    bodyFormData.set("name", this.state.name);
    const newCategory = {
      name: this.state.name
    };

    // Private Request to Server with JWT Token
    const instance = axios.create({
      timeout: 1000,
      headers: { Authorization: localStorage.user_token }
    });

    instance.post("/api/categories/add", newCategory).then(res => {
      if (res.data.success === true) {
        alert(res.data.msg);
        that.props.history.push("/admin/categories");
      } else {
        alert(res.data.msg);
      }
    });
  };

  render() {
    const { name } = this.state;
    return (
      <div className="app-content content container-fluid" style={this.styles}>
        <div className="content-wrapper">
          <div className="content-header row" />
          <div className="content-body">
            <div className="row">
              <div className="col-xs-12">
                <div className="card">
                  <div className="card-body">
                    <div className="card-block">
                      <h1>
                        Add New Category{" "}
                        <Link
                          to="/admin/categories/"
                          className="btn btn-success float-right"
                        >
                          View All Cateogries
                        </Link>
                      </h1>
                      <hr />
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-6 centered">
                            <form method="post" action="#">
                              <div className="form-group">
                                <label>Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  value={name}
                                  onChange={e =>
                                    this.setState({ name: e.target.value })
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={this.submitForm}
                                >
                                  Save
                                </button>
                              </div>
                            </form>
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
    );
  }
}

export default AddCategory;
