
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";



dotenv.config({
  path: './.env'
})

connectDB()
  .then(() => {
    console.log("Mongo connection success indexjs");
    app.on("error", (err) => {
      console.log("Express error-->", err.message);
    });
    app.listen(process.env.PORT || 9000, () => {
      console.log(`Example app listening on port ${process.env.PORT || 9000}!`)
    });
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  })
  .catch((err) => console.log("connection fail indexjs-->", err.message));

// app();

