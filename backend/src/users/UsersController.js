const app = require("express");
const router = app.Router();
const User = require("./UsersModel");
const bcrypt = require("bcrypt");
const { auth } = require("../middlewares/auth");

const saltRounds = 10;

router.post("/users/save", (req, res) => {
  var { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({ message: "Please fill in all fields!" });
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
            res.status(201).send({ message: "User created successfully." });
          });
        });
      } else {
        res.status(400).send({ message: "This email is already being used." });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/user/delete/:id", (req, res) => {
  var id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({ message: "Please send a numeric parameter." });
  } else {
    User.findOne({
      where: {
        id: id,
      },
    }).then((user) => {
      if (user != undefined) {
        user.destroy({}).then(() => {
          res.status(200).send({ message: "User removed successfully." });
        });
      } else {
        res.status(404).send({ message: "This user id does not exist." });
      }
    });
  }
});

router.put("/user/update/:id", (req, res) => {
  var id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({ message: "Please send a numeric parameter." });
  } else {
    User.findOne({
      where: {
        id: id,
      },
    }).then((user) => {
      if (user != undefined) {
        var { firstName, lastName, email, password } = req.body;
        if (firstName != undefined) {
          user.firstName = firstName;
        }

        if (lastName != undefined) {
          user.lastName = lastName;
        }

        if (email != undefined) {
          user.email = email;
        }

        if (password != undefined) {
          user.password = password;
        }
        bcrypt.hash(password, saltRounds, (error, hash) => {
          user
            .update({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: hash,
            })
            .then(() => {
              res.status(200).send({ message: "User updated successfully!" });
            });
        });
      } else {
        res.status(404).send({ message: "This user id does not exist." });
      }
    });
  }
});

router.get("/users", auth, (req, res) => {
  User.findAll().then((user) => {
    res.status(200).json({ Users: user });
  });
});

router.get("/user/:id", auth, (req, res) => {
  var id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({ message: "Please send a numeric parameter." });
  } else {
    User.findOne({
      where: {
        id: id,
      },
    }).then((user) => {
      if (user != undefined) {
        res.status(200).json(user);
      } else {
        res.status(404).send({ message: "This user id does not exist." });
      }
    });
  }
});

module.exports = router;
