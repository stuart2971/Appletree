const router = require("express").Router()
const Order = require("../models/Order.model")

//Show all Orders
router.route("/show").get((req, res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json("Error: ", err))
})

//Add an order
router.route("/add").post((req, res) => {
    let newOrder = new Order({
        name: req.body.name,
        price: req.body.price,
        sandwichType: req.body.sandwichType,
        toppings: req.body.toppings,
        spice: req.body.spice,
        cheese: req.body.cheese,
        phoneNumber: req.body.phoneNumber,
        date: req.body.date
    })
    newOrder.save()
        .then(() => res.json("User added")) 
        .catch(err => res.status(400).json("Error: ", err))
})

//Remove an order
router.route("/remove/:id").delete((req, res) => {
    Order.deleteOne({ _id: req.params.id })
        .then(() => res.json("Deleted Successfully"))
        .catch(err => res.status(400).json("Error: ", err))
    console.log(req.params)
})

//Update an order (mark as complete)
router.route("/update/:id").put((req, res) => {
    Order.updateOne({
        _id: req.params.id
    }, { 
        $set: { 
            isCompleted: true
        }
    })
    .then(() => res.json("Updated Successfully"))
    .catch(err => res.status(400).json("Error: ", err))
})

module.exports = router
