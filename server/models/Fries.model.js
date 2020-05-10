const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    type: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Fries", orderSchema)