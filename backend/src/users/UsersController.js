const app = require("express");
const router = app.Router();
const User = require("./UsersModel");
const bcrypt = require("bcrypt");

router.post("/users/save", (req, res) => {
  const saltRounds = 10;
  var { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .send({ message: "Por favor, preencha todos os campos!" });
  }

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (user == undefined) {
        bcrypt.hash(password, saltRounds, (error, hash) => {
            User.create({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: hash,
            }).then(() => {
              res.status(200).send({ message: "Usuário criado com sucesso." });
            });
        });
      } else {
        res.status(400).send({ message: "Este e-mail já está sendo usado." });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
