import express from "express"
import cors from "cors"
require("dotenv/config")
import  mongoose from "mongoose"
import io from "socket.io"

const app = express()
const socket = io(require("http").Server(app));

//Order routes -- Server side
const ShowOrdersRouter = require("./server/routes/orders")
app.use("/orders", ShowOrdersRouter)

//Dont know what this stuff does
app.use(cors())
app.use(express.json())

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connected to db")
})
//Run server
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000")
})
//Sockets

socket.on("connection", (socket) => {
    console.log("Connected from sockets")
})