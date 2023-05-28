const express = require("express");
require("../config/config");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const fs = require("fs");
const request = require("request");

module.exports.getDefault = (req, res) => {
  console.log("hello for get request");
  res.send("hello for test request");
};

module.exports.createUser = async (req, res) => {
  const { username, firstname, lastname, email, password, subscription_id } =
    req.body;
  User.findOne({ email })
    .then((response) => {
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
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.loginUser = async (req, res) => {
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
      res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
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

module.exports.getUserByUsername = async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({ username });
  if (user) {
    //res.send(user)
    res.send(JSON.stringify(user));
  } else {
    res.send("User not found, please recheck the username");
  }
};

module.exports.triggerPipeline = async (req, res) => {
  const jenkins_url = `http://localhost:5000/job/PFAPIPELINE/buildWithParameters?&OSIMAGE=${req.body.parameter}`;
  const params = req.body;
  var name =
    __dirname + "\\..\\..\\..\\terraform-template\\terraform.tfvars.json";
  var m = JSON.parse(fs.readFileSync(name).toString());
  Object.entries(params).map((p) => {
    m[p[0]] = p[1];
  });
  fs.writeFileSync(name, JSON.stringify(m));
  var clientServerOptions = {
    uri: jenkins_url,
    body: "",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("mk:116a4a96ddedae25b84ee05251982b2ffe"),
    },
  };
  request(clientServerOptions, function (error, response) {
    console.log(error, response.body);
    return;
  });
  res.send(m);
};

module.exports.installDockerOrMySql = (req, res) => {
  const jenkins_url = `http://localhost:5000/job/pfa-pipeline-ansible/buildWithParameters?&BUTTON=${req.body.button}&OSIMAGE=${req.body.parameter}`;
  const params = req.body;
  var clientServerOptions = {
    uri: jenkins_url,
    body: "",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("mk:116a4a96ddedae25b84ee05251982b2ffe"),
    },
  };
  request(clientServerOptions, function (error, response) {
    console.log(error, response.body);
    return;
  });
};
