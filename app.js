const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { connectToSqlDb } = require("./config/sql");
const { connectToMongoDb } = require("./config/mongo");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

connectToSqlDb()
connectToMongoDb()

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend running smoothly 👌" });
});

module.exports = app;
