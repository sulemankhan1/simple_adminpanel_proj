const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
var multer = require("multer");
var fs = require("fs");
var upload = multer({ dest: "uploads/" });

// Includes
const Product = require("../../model/Product");
// const config = require("../../config/config");

// @type GET   /api/products/
// @desc        Get All Products
// @access      Public
router.get("/", (req, resp) => {
  Product.find().then(products => {
    resp.json({
      success: true,
      data: products
    });
  });
});

// @type POST   /api/products/add
// @desc        Add New Product
// @access      Private
router.post(
  "/add",
  [passport.authenticate("jwt", { session: false }), upload.single("image")],
  (req, resp) => {
    const newProduct = new Product({
      user: req.user.id,
      category: req.body.category,
      name: req.body.name,
      qty: req.body.qty,
      desc: req.body.desc,
      image: req.file.path
    });

    newProduct
      .save()
      .then(products => {
        resp.json({
          success: true,
          msg: "Product Added Successfully",
          data: products
        });
      })
      .catch(err => {
        return resp.json({
          success: false,
          msg: "Something went Wrong",
          data: err
        });
      });
  }
);

// @type POST   /api/products/edit/:product_id
// @desc        Edit Product
// @access      Private
router.post(
  "/edit/:product_id",
  passport.authenticate("jwt", { session: false }),
  (req, resp) => {
    let data = req.body;
    Product.findById(req.params.product_id).then(product => {
      if (product.user.toString() === req.user.id) {
        data.user = req.user.id;
        Product.findOneAndUpdate(
          { _id: req.params.product_id },
          { $set: data },
          { new: true }
        ).then(product => {
          return resp.json({
            success: true,
            msg: "Product Updated Successfully!",
            data: product
          });
        });
      } else {
        // Product is not associated with current user
        return resp.json({
          success: false,
          msg: "You can't Edit Product Added by Other User"
        });
      }
    });
  }
);

// @type DELETE   /api/products/delete/:product_id
// @desc        Delete Product
// @access      Private
router.delete(
  "/delete/:product_id",
  passport.authenticate("jwt", { session: false }),
  (req, resp) => {
    Product.findById(req.params.product_id).then(product => {
      if (product.user != undefined) {
        if (product.user.toString() === req.user.id) {
          Product.findByIdAndDelete(req.params.product_id).then(product => {
            // Delete Image
            const path = __dirname + "../../uploads/../../" + product.image;

            fs.unlink(path, err => {});
            return resp.json({
              success: true,
              msg: "Product Deleted Successfully!",
              data: product
            });
          });
        } else {
          // Product is not associated with current user
          return resp.json({
            success: false,
            msg: "You can't Delete Product Added by Other User"
          });
        }
      }
    });
  }
);

module.exports = router;
