const express = require("express");
const userRoute = require("./routes/authRoute");
const app = express();
const cors = require("cors");
const dbConnection = require("./config/database");
const { errorHandler } = require("./handler/errorHandler");
const { resPattern } = require("./handler/responseHandler");
const serviceRouter = require("./routes/serviceRoute");
require("dotenv").config();

const port = process.env.SERVER_PORT;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json(resPattern("Welcome", res.statusCode));
});

app.use("/user", userRoute);

app.use("/portal", serviceRouter);

app.get("*", (req, res) => {
  res.status(404).json(resPattern("Oops! Seems like you are lost :)"));
});

app.use(errorHandler);

app.listen(port, (err) => {
  if (!err) console.log("Server running on", port);
  dbConnection();
});
