const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

function auth(req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    var token = bearer[1];
    jwt.verify(token, jwtSecret, (error, data) => {
      if (error) {
        res.status(401).send({ message: "Invalid Token!" });
      } else {
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email };
        next();
        console.log(data);
      }
    });
  } else {
    res.status(401).send({ message: "Invalid Token!" });
  }
}

module.exports = {auth , jwtSecret};
