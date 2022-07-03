const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);


mongoose.connect("mongodb+srv://zuber:87654321@cluster0.qejzh.mongodb.net/users?retryWrites=true&w=majority").then(() => {
	console.log("Connection Succesfully established")
}).catch((error) => {
	console.log(error.message);
})


app.listen(8000, () => {
	console.log("App is running")
})