const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

// Includes
const Category = require("../../model/Category");
// const config = require("../../config/config");

// @type GET   /api/categories/
// @desc        Get All Categories
// @access      Public
router.get("/", (req, resp) => {
  Category.find().then(categories => {
    resp.json({
      success: true,
      data: categories
    });
  });
});

// @type GET   /api/categories/get_one/:id (category id)
// @desc        Get One Category
// @access      Public
router.get("/get_one/:id", (req, resp) => {
  Category.findById(req.params.id).then(category => {
    resp.json({
      success: true,
      data: category
    });
  });
});

// @type POST   /api/categories/add
// @desc        Add New Category
// @access      Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, resp) => {
    const newCateogry = new Category({
      user: req.user.id,
      name: req.body.name
    });

    newCateogry
      .save()
      .then(category => {
        resp.json({
          success: true,
          msg: "Category Added Successfully",
          data: category
        });
      })
      .catch(err => {
        return resp.json({
          success: false,
          msg: "Something went Wrong"
        });
      });
  }
);

// @type POST   /api/categories/edit/:category_id
// @desc        Edit Category
// @access      Private
router.post(
  "/edit/:category_id",
  passport.authenticate("jwt", { session: false }),
  (req, resp) => {
    let data = req.body;
    Category.findById(req.params.category_id).then(category => {
      if (category.user.toString() === req.user.id) {
        data.user = req.user.id;
        Category.findOneAndUpdate(
          { _id: req.params.category_id },
          { $set: data },
          { new: true }
        ).then(category => {
          return resp.json({
            success: true,
            msg: "Category Updated Successfully!",
            data: category
          });
        });
      } else {
        // cateogry is not associated with current user
        return resp.json({
          success: false,
          msg: "You can't Edit Category Added by Other User"
        });
      }
    });
  }
);

// @type DELETE   /api/categories/delete/:category_id
// @desc        Delete Category
// @access      Private
router.delete(
  "/delete/:category_id",
  passport.authenticate("jwt", { session: false }),
  (req, resp) => {
    Category.findById(req.params.category_id).then(category => {
      if (category.user.toString() === req.user.id) {
        Category.findByIdAndDelete(req.params.category_id).then(category => {
          return resp.json({
            success: true,
            msg: "Category Deleted Successfully!",
            data: category
          });
        });
      } else {
        // cateogry is not associated with current user
        return resp.json({
          success: false,
          msg: "You can't Delete Category Added by Other User"
        });
      }
    });
  }
);

module.exports = router;
