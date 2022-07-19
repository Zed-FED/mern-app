const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
