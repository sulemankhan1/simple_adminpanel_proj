import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import "./custom.css";

// Includes

class Products extends Component {
  state = {
    products: []
  };

  constructor(props) {
    super(props);

    this.getProducts();
  }

  getProducts = () => {
    // Fetch all Products
    axios.get("/api/products/").then(res => {
      if (res.data.success === true) {
        this.setState({ products: res.data.data });
      }
    });
  };

  formatDate = d => {
    let date = new Date(d);
    let formatted_date = "";
    formatted_date += date.getDay() + "-";
    formatted_date += date.getMonth() + "-";
    formatted_date += date.getFullYear();
    return formatted_date;
  };

  // Delete Product
  deleteProduct = id => {
    const decision = window.confirm("Are you Sure you want to Delete this?");
    if (decision === true) {
      // Private Request to Server with JWT Token
      const instance = axios.create({
        timeout: 1000,
        headers: { Authorization: localStorage.user_token }
      });

      instance.delete("/api/products/delete/" + id).then(res => {
        if (res.data.success === true) {
          alert(res.data.msg);
          this.getProducts();
        } else {
          alert(res.data.msg);
        }
      });
    }
  };

  render() {
    const { products } = this.state;
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
                          Products{" "}
                          <Link
                            to="/admin/products/add"
                            className="btn btn-success float-right"
                          >
                            Add New Product
                          </Link>
                        </h1>
                        <div className="row">
                          <div className="col-md-12">
                            <table className="table table-stripped">
                              <thead>
                                <tr>
                                  <th>S.NO</th>
                                  <th>Name</th>
                                  <th>Quantity</th>
                                  <th>Image</th>
                                  <th>Description</th>
                                  <th>Date</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {products.length === 0 ? (
                                  <tr>
                                    <th
                                      colSpan="7"
                                      style={{ textAlign: "center" }}
                                    >
                                      No Records Found
                                    </th>
                                  </tr>
                                ) : (
                                  ""
                                )}
                                {products.map((item, index) => (
                                  <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td>
                                      <img
                                        src={"../" + item.image}
                                        alt={item.image}
                                        width={80}
                                      />
                                    </td>
                                    <td>{item.desc}</td>
                                    <td>{this.formatDate(item.date)}</td>
                                    <td>
                                      <button className="btn btn-sm btn-primary">
                                        Edit
                                      </button>{" "}
                                      <button
                                        onClick={this.deleteProduct.bind(
                                          this,
                                          item._id
                                        )}
                                        className="btn btn-sm btn-primary"
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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

export default Products;
