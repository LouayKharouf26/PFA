import * as mongoose from "mongoose";
require("dotenv").config();

let database_url =
  process.env.DB_URI_DEV ||
  process.env.DB_URI_COMPOSE ||
  process.env.DB_URI_PROD;

mongoose.set("strictQuery", true);
mongoose
  .connect(database_url)
  .then((result) => {
    console.log(process.env.PORT);
    console.log(`Database ${database_url} listening on ${process.env.PORT}`);
  })
  .catch((err) => {
    console.log("error while connecting to db");
    console.log(err);
  });
