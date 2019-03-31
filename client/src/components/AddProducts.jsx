import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import "./AddProducts.css";

// Components

class AddProducts extends Component {
  state = {
    cat_id: 1,
    categories: [],
    category: "",
    name: "",
    qty: "",
    desc: "",
    file: { name: null },
    images: []
  };

  constructor(props) {
    super(props);
    this.getCategories();
  }

  changeCategory = e => {
    this.setState({ category: e.target.value });
  };
  getCategories = () => {
    // Getting Categories from Database
    axios.get("/api/categories/").then(res => {
      if (res.data.success === true) {
        this.setState({ categories: res.data.data });
      }
    });
  };

  onChangeImg = e => {
    // user choose image then save the img object in "file"
    this.setState({ file: e.target.files[0] });
  };
  onFormSubmit = e => {
    e.preventDefault();
    const that = this;
    const url = "/api/products/add";
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.set("category", this.state.category);
    formData.set("name", this.state.name);
    formData.set("qty", this.state.qty);
    formData.set("desc", this.state.desc);

    const instance = axios.create({
      timeout: 1000,
      headers: { Authorization: localStorage.user_token }
    });

    instance.post(url, formData).then(res => {
      if (res.data.success === true) {
        alert(res.data.msg);
        that.props.history.push("/admin/products");
      } else {
        alert(res.data.msg);
      }
    });
  };

  fileUpload = file => {};

  render() {
    const { name, qty, desc } = this.state;
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
                          Add New Product{" "}
                          <Link
                            to="/products/add"
                            className="btn btn-success float-right"
                          >
                            Add New Product
                          </Link>
                        </h1>
                        <hr />
                        <div className="row">
                          <div className="col-md-12">
                            <div className="col-md-6 centered">
                              <form
                                method="post"
                                action="/api/products/add"
                                encType="multipart-formdata"
                              >
                                <div className="form-group">
                                  <label>Select Category</label>
                                  <select
                                    className="form-control"
                                    name="category"
                                    onChange={this.changeCategory}
                                  >
                                    <option value="" selected>
                                      -- Please select an option --
                                    </option>
                                    {this.state.categories.map(
                                      (item, index) => (
                                        <option value={item._id} key={index}>
                                          {item.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
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
                                  <label>Quantity</label>
                                  <input
                                    type="text"
                                    name="qty"
                                    className="form-control"
                                    value={qty}
                                    onChange={e =>
                                      this.setState({ qty: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Image</label>
                                  <input
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    onChange={this.onChangeImg}
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Description</label>
                                  <textarea
                                    className="form-control"
                                    name="desc"
                                    value={desc}
                                    onChange={e =>
                                      this.setState({ desc: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={this.onFormSubmit}
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

export default AddProducts;
