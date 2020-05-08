const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const path = require("path");

const orderRouter = require("./routes/orders")

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/orders", orderRouter)

mongoose.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true})
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connected to db")
})

app.listen(process.env.PORT || 3001, () => {
    console.log("Listening on port 3001")
});
