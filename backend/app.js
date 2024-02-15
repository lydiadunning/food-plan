const express = require("express");
require("express-async-errors");
const cors = require("cors");
const config = require("./utils/config");
const mongoose = require("mongoose");
const kidRouter = require("./controllers/kids.js");
const outcomeTipRouter = require("./controllers/outcomeTips.js");
const logger = require("./utils/logger");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
} = require("./utils/middleware.js");
const userRouter = require("./controllers/users.js");
const loginRouter = require("./controllers/login.js");
const spaRouter = require('./controllers/spa.js')

const app = express();

app.use(express.static("dist")); // serves static files, in this case the frontend build, in a directory called dist.
app.use(express.json()); // enables json parsing middleware
app.use(requestLogger);
app.use(tokenExtractor);

// This setting allows values not present in the Schema to be saved to the database
mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  // eslint-disable-next-line no-unused-vars
  .then((result) => {
    logger.info("connected to", config.MONGODB_URI);
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors()); // enables cors (cross origin resource sharing)
app.get(config.PORT, cors(), function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for a Single Route" });
});

app.use("/api/kid", userExtractor, kidRouter);
app.use("/api/outcometips", outcomeTipRouter);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("*", spaRouter)

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
