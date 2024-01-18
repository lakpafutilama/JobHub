const express = require("express");
const customerRoute = require("./routes/authRoute");
const app = express();
const cors = require("cors");
const dbConnection = require("./config/database");
const { errorHandler } = require("./handler/errorHandler");
require("dotenv").config();

const port = process.env.SERVER_PORT;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "WELCOME TO JOBHUB" });
});

app.use("/user", customerRoute);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

app.listen(port, (err) => {
  if (!err) console.log("Server running on", port);
  dbConnection();
});
