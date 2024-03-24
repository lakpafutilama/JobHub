const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRoute = require("./routes/authRoute");
const { resPattern } = require("./handler/responseHandler");
const { errorHandler } = require("./handler/errorHandler");
const serviceRouter = require("./routes/serviceRoute");
const dbConnection = require("./config/database");

require("dotenv").config();

const app = express();

const port = process.env.SERVER_PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json(resPattern("Welcome", res.statusCode));
});

app.use("/", userRoute);

app.use("/portal", serviceRouter);

app.get("*", (req, res) => {
  res.status(404).json(resPattern("Oops! Seems like you are lost :)"));
});

app.use(errorHandler);

app.listen(port, (err) => {
  if (!err) console.log("Server running on", port);
  dbConnection();
});
