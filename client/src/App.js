import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import EditCategory from "./components/EditCategory";
import Categories from "./components/Categories";
import Users from "./components/Users";
import Products from "./components/Products";
import AddProducts from "./components/AddProducts";
import AddCategory from "./components/AddCategory";
import Login from "./components/Login";

import "./App.css";

class App extends Component {
  state = {
    cat_id: 1
  };
  render() {
    return (
      <Router>
        <Route path="/admin/" component={Navbar} />
        <Route path="/admin/" component={Sidebar} />
        <Route exact path="/admin" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin/categories/add" component={AddCategory} />
        <Route exact path="/admin/categories" component={Categories} />
        <Route
          exact
          path="/admin/categories/edit/:id"
          component={EditCategory}
        />
        <Route exact path="/admin/products" component={Products} />
        <Route exact path="/admin/products/add" component={AddProducts} />
        <Route exact path="/admin/users" component={Users} />
        <Route path="/admin/" component={Footer} />
      </Router>
    );
  }
}

export default App;
