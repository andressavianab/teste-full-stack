const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

var cors = require("cors");
const axios = require("axios");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const { authenticateDb } = require("./database/database");
const { auth } = require("./middlewares/auth");
const { jwtSecret } = require("./middlewares/auth")

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const User = require("./users/UsersModel");
const usersController = require("./users/UsersController");
app.use("/", usersController); 

authenticateDb();

app.post("/auth", (req, res) => {
  var { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Please fill in all fields!" });
  }

  User.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (user != undefined) {
      var correctPassword = bcrypt.compareSync(password, user.password);
      if (correctPassword) {
        return res.json({
          user: {
            id: user.id,
            email: user.email
          },
          token: jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
            expiresIn: "48h"
          })
        });
      } else {
        res.status(401).send({ message: "Incorrect password." });
      }
    } else {
      res
        .status(404)
        .send({ message: "Sorry, we couldn't find your account." });
    }
  });
});


app.get("/beers", auth, async (req, res) => {
  try {
    const { data } = await axios("https://api.punkapi.com/v2/beers");
    return res.json(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
