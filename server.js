const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const fs = require("fs");
const app = express();

// Includes
const config = require("./config/config");
const db = require("./config/db").dbURI;
require("./config/passport")(passport);
const userRoutes = require("./Routes/api/Users");
const categoriesRoutes = require("./Routes/api/Categories");
const productsRoutes = require("./Routes/api/Products");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

// Host images
app.get("/uploads/:img_name", (req, resp) => {
  const path = __dirname + "/uploads/" + req.params.img_name;

  try {
    if (fs.existsSync(path)) {
      resp.sendFile(path);
    } else {
      resp.sendFile(__dirname + "/uploads/default.png");
    }
  } catch (err) {
    console.log(err);
  }
});

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`Database Connected!`);
  })
  .catch(err => {
    console.log(`Error: Database connection issue: ${err}`);
  });

app.listen(config.port, () => {
  console.log(`Server Started on PORT: ${config.port}`);
});
