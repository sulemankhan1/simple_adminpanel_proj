import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import "./custom.css";

// Includes

class Users extends Component {
  state = {
    users: []
  };
  constructor(props) {
    super(props);

    this.getUsers();
  }

  getUsers = () => {
    // Fetch all Users
    axios.get("/api/users/").then(res => {
      if (res.data.success === true) {
        this.setState({ users: res.data.data });
      }
    });

    // Private Request to Server with JWT Token
    const instance = axios.create({
      timeout: 1000,
      headers: { Authorization: localStorage.user_token }
    });

    instance.get("/api/users/").then(res => {
      if (res.data.success === true) {
        this.setState({ users: res.data.data });
      } else {
        alert(res.data.msg);
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

  deleteUser = id => {
    const decision = window.confirm("Are you Sure you want to Delete this?");
    if (decision === true) {
      // Private Request to Server with JWT Token
      const instance = axios.create({
        timeout: 1000,
        headers: { Authorization: localStorage.user_token }
      });

      instance.delete("/api/users/delete/" + id).then(res => {
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
    const { users } = this.state;
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
                        <h1>Users </h1>
                        <div className="row">
                          <div className="col-md-12">
                            <table className="table table-stripped">
                              <thead>
                                <tr>
                                  <th>S.NO</th>
                                  <th>Username</th>
                                  <th>Email</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {users.map((item, index) => (
                                  <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>
                                      {item.type !== "admin" ? (
                                        <div>
                                          <button className="btn btn-sm btn-primary">
                                            Edit
                                          </button>
                                          <button
                                            onClick={this.deleteUser.bind(
                                              this,
                                              item._id
                                            )}
                                            className="btn btn-sm btn-primary"
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      ) : (
                                        ""
                                      )}
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

export default Users;
