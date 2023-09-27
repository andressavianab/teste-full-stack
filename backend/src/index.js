const express = require("express");
const app = express();
const axios = require("axios");
const { authenticate } = require("./database/database");
const port = 3000;

const User = require('./users/UsersModel');

authenticate();

app.get("/", async (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
