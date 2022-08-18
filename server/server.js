const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "200mb" }));

const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
app.use(userRoutes);
app.use(categoryRoutes);

mongoose
  .connect(process.env.API_URL)
  .then(() => {
    console.log("Connection Succesfully established");
  })
  .catch((error) => {
    console.log(error.message);
  });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);
