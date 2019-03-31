import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import "./custom.css";

class EditCategory extends Component {
  state = {
    cat_id: this.props.match.params.id,
    name: ""
  };

  constructor(props) {
    super(props);
    this.getCategory(this.state.cat_id);
  }

  getCategory = id => {
    // Get Category
    axios.get("/api/categories/get_one/" + this.state.cat_id).then(res => {
      if (res.data.success === true) {
        this.setState({ name: res.data.data.name });
      }
    });
  };

  submitForm = e => {
    e.preventDefault();
    const that = this;
    const { cat_id, name } = this.state;
    let bodyFormData = new FormData();
    bodyFormData.set("name", name);
    const categoryData = { name };

    const instance = axios.create({
      timeout: 1000,
      headers: { Authorization: localStorage.user_token }
    });

    instance.post("/api/categories/edit/" + cat_id, categoryData).then(res => {
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
                    <div className="card-body">
                      <div className="card-block">
                        <h1>
                          Edit Category{" "}
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
      </Router>
    );
  }
}

export default EditCategory;
