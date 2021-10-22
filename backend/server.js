const express = require("express");
const dotenv = require("dotenv");

const db = require("./config/db");
const Product = require("./routes/Product");
const User = require("./routes/User");
const Order = require("./routes/Order");
const { notFound, errorHandler } = require("./middleware/error");

dotenv.config();

db();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API");
});

app.use("/api/products", Product);
app.use("/api/users", User);
app.use("/api/orders", Order);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV;

app.listen(
  PORT,
  console.log(`Server is listening in ${NODE_ENV} mode at ${PORT} port!!!`)
);
