import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import "./custom.css";

// Includes
import ViewAll from "./categories_pages/ViewAll";
import EditCategory from "./EditCategory";

class Categories extends Component {
  state = {
    categories: []
  };

  constructor(props) {
    super(props);

    this.getCategories();
  }

  getCategories = () => {
    // Fetch all Categories
    axios.get("/api/categories/").then(res => {
      if (res.data.success === true) {
        this.setState({ categories: res.data.data });
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

  handleEdit = id => {
    this.props.history.push("/admin/categories/edit/" + id);
  };
  handleDelete = id => {
    const decision = window.confirm("Are you Sure you want to Delete this?");
    if (decision === true) {
      // Delete Cateogry
      // Private Request to Server with JWT Token
      const instance = axios.create({
        timeout: 1000,
        headers: { Authorization: localStorage.user_token }
      });

      instance.delete("/api/categories/delete/" + id).then(res => {
        if (res.data.success === true) {
          alert(res.data.msg);
          this.getCategories();
        } else {
          alert(res.data.msg);
        }
      });
    }
  };
  render() {
    return (
      <Router>
        <Route
          exact
          path="/admin/categories"
          component={() => (
            <ViewAll
              categories={this.state.categories}
              onFormatDate={this.formatDate}
              onEdit={this.handleEdit}
              onDelete={this.handleDelete}
            />
          )}
        />
        <Route
          exact
          path="/admin/categories/edit/"
          component={() => <EditCategory category_id={this.state.cat_id} />}
        />
      </Router>
    );
  }
}

export default Categories;
