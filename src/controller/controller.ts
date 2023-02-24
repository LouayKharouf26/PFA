import * as express from "express";

module.exports.getDefault = (req: express.Request, res: express.Response) => {
  console.log("hello for get request");
  res.send("hello for test request");
};

module.exports.addUser = (req: express.Request, res: express.Response) => {
  const body = req.body;
};
