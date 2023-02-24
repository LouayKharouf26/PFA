import * as express from "express";

module.exports.getDefault = (req: express.Request, res: express.Response) => {
  console.log("hello for get request");
  res.send("hello for test request");
};
