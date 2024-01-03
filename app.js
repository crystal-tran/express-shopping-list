const express = require("express");
const app = express();

const itemRoutes = require("./itemRoutes");
const { NotFoundError } = require("./expressError");

app.use(express.json());                           // process JSON data
app.use(express.urlencoded());                     // process trad form data

app.use("/items", itemRoutes);

/** 404 handler: matches unmatched routes. */
app.use(function (req, res) {                      // handle site-wide 404s
  throw new NotFoundError();
});


/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {           // global err handler
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;