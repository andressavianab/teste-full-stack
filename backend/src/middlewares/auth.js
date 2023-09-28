const jwt = require("jsonwebtoken");
const jwtSecret = "iajkdfjuikde";

function auth(req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    var token = bearer[1];
    jwt.verify(token, jwtSecret, (error, data) => {
      if (error) {
        res.status(401).send({ message: "Token inválido!" });
      } else {
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email };
        next();
        console.log(data);
      }
    });
  } else {
    res.status(401).send({ message: "Token inválido!" });
  }
}

module.exports = {auth , jwtSecret};
