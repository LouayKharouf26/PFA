import * as express from "express";
require("../config/config");
import User from "../models/user";

module.exports.getDefault = (req: express.Request, res: express.Response) => {
  console.log("hello for get request");
  res.send("hello for test request");
};

module.exports.createUser = (req: express.Request, res: express.Response) => {
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
