const express = require("express");
require('dotenv').config()
var bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;

var cors = require("cors");
const axios = require("axios");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { authenticateDb } = require("./database/database");
const { auth } = require("./middlewares/auth");
const { jwtSecret } = require("./middlewares/auth");

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
    return res.status(400).send({ message: "Please fill in all fields!" });
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
            email: user.email,
          },
          token: jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
            expiresIn: "48h",
          }),
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

app.get("/all-pages", auth, async (req, res) => {
  const requestedPage = parseInt(req.query.page);

  if (isNaN(requestedPage) || requestedPage < 1 || requestedPage > 13) {
    return res.status(400).send({ message: "Invalid page number" });
  }

  const beerName = req.query.beer_name; 
  const abvGt = req.query.abv_gt;
  try {
    let apiUrl = `https://api.punkapi.com/v2/beers?page=${requestedPage}`;

    if (beerName) {
      const formattedBeerName = beerName.replace(/ /g, "_")
      apiUrl += `&beer_name=${encodeURIComponent(formattedBeerName)}`;
    }

    if (abvGt) {
      apiUrl += `&abv_gt=${encodeURIComponent(abvGt)}`;
    }

    const { data } = await axios.get(apiUrl);
    if (!Array.isArray(data)) {
      return res
        .status(500)
        .send({ message: "External API data is not in the expected format." });
    }
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Error fetching page data" });
  }
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
