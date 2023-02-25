import * as express from "express";
require("../config/config");
import User from "../models/user";
import * as jwt from "jsonwebtoken";
import * as md5 from "md5";

module.exports.getDefault = (req: express.Request, res: express.Response) => {
  console.log("hello for get request");
  res.send("hello for test request");
};

module.exports.createUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { username, firstname, lastname, email, password, subscription_id } =
    req.body;
  User.findOne({ email })
    .then((response) => {
      console.log(response);
      if (response == null) {
        User.create({
          username,
          firstname,
          lastname,
          email,
          password,
          subscription_id,
        })
          .then((response) => {
            res.send("User added successfully to database");
            res.status(200);
          })
          .catch((err) => console.log(err));
      } else {
        res.status(400);
        res.send("User is already in the database");
      }
    })
    .catch((err) => console.log(err));
};

//jwt token creation for user
const maxAge = 700 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secretkey", {
    expiresIn: maxAge,
  });
};

module.exports.loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    var auth;
    if (md5(password) === user.password) auth = true;
    else {
      res.send("Wrong password please retype it again");
      auth = false;
    }
    if (auth) {
      const token = createToken(user._id);
      res.cookie("jwt", token, { maxAge: maxAge * 1000 });
      console.log(JSON.stringify({ id: user._id.valueOf() }));
      res
        .status(200)
        .send(JSON.stringify({ id: user._id.valueOf(), name: user.firstname }));
    }
  } else {
    res.status(400);
    res.send("Wrong username please retype it again");
  }
};
