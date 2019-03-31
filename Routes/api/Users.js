const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

// Includes
const User = require("../../model/User");
const config = require("../../config/config");

// @type POST   /api/users/register
// @desc        create New Account
// @access      Public
router.post("/register", (req, resp) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  if (newUser.password === "") {
    return resp.json({
      succes: false,
      msg: "Password Field Required"
    });
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if (err)
        throw {
          succes: false,
          msg: "Something Went Wrong during Hashing",
          data: err
        };
      newUser.password = hash;

      // Save User
      newUser
        .save()
        .then(user => {
          resp.json({
            success: true,
            msg: "User Added Successfully",
            data: user
          });
        })
        .catch(err => {
          let msg = "Something Went Wrong";
          if (err.code == 11000) {
            // Email Already Exists
            msg = "An Account with the same Email Already Exists";
          }

          resp.json({ success: false, msg, data: err });
        });
    });
  });
});

// @type POST   /api/users/login
// @desc        Login User
// @access      Public
router.post("/login", (req, resp) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);

  // Check database if user found with same email
  User.findOne({ email })
    .then(user => {
      // compare passwords
      if (user.password != "") {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords matched
            // create payload
            const payload = {
              id: user._id,
              username: user.username,
              email: user.email
            };
            //   generate json web token
            jwt.sign(
              payload,
              config.jwtSecret,
              { expiresIn: 7200 },
              (err, token) => {
                // send response
                resp.json({
                  success: true,
                  msg: "Logged In Successfully",
                  token: "Bearer " + token
                });
              }
            );
          } else {
            resp.json({ success: false, msg: "Incorrect Password" });
          }
        });
      }
    })
    .catch(err => {
      resp.json({ success: false, msg: "Incorrect Email" });
    });
});

// @type GET   /api/users/
// @desc        Get All Users
// @access      Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, resp) => {
    User.find()
      .then(users => {
        resp.json({ success: true, data: users });
      })
      .catch(err => {
        resp.json({ success: false, data: err });
      });
  }
);

// @type POST   /api/users/edit/:id (user_id)
// @desc        Update User
// @access      Private
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, resp) => {
    let data = req.body;

    User.findById(req.params.id).then(user => {
      data.password = user.password;
      User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
      ).then(user => {
        resp.json({
          success: true,
          msg: "User Updated Successfully!",
          data: user
        });
      });
    });
  }
);

// @type DELETE   /api/users/delete/:id (user_id)
// @desc        Delete User
// @access      Private
router.delete(
  "/delete/",
  passport.authenticate("jwt", { session: false }),
  (req, resp) => {
    User.findByIdAndDelete(req.user.id)
      .then(user => {
        resp.json({
          success: true,
          msg: "User Deleted Successfully!",
          data: user
        });
      })
      .catch(err => {
        resp.json({ success: false, msg: "Something went wrong", data: err });
      });
  }
);

module.exports = router;
