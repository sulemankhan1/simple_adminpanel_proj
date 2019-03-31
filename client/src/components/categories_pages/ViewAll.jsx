import React, { Component } from "react";
import { Link } from "react-router-dom";

class ViewAll extends Component {
  state = {};

  render() {
    const { categories, onFormatDate } = this.props;
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
                        Categories{" "}
                        <Link
                          to="/admin/categories/add"
                          className="btn btn-success float-right"
                        >
                          Add New Category
                        </Link>
                      </h1>
                      <div className="row">
                        <div className="col-md-12">
                          <table className="table table-stripped">
                            <thead>
                              <tr>
                                <th>S.NO</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {categories.map((item, index) => (
                                <tr key={index}>
                                  <td>{++index}</td>
                                  <td>{item.name}</td>
                                  <td>{onFormatDate(item.date)}</td>
                                  <td>
                                    <button
                                      onClick={this.props.onEdit.bind(
                                        this,
                                        item._id
                                      )}
                                      className="btn btn-sm btn-primary"
                                    >
                                      Edit
                                    </button>{" "}
                                    <button
                                      onClick={this.props.onDelete.bind(
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
    );
  }
}

export default ViewAll;
