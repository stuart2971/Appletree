const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Pusher = require('pusher');
require("dotenv").config();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT || 3000, () => {
    console.log("running on port 3000")
});

mongoose.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true})
const db = mongoose.connection;

var pusher = new Pusher({
    appId: '998256',
    key: 'bebb9d52f8b135fdd6d0',
    secret: '478101aec42810662476',
    cluster: 'us2',
    useTLS: true
});

db.once("open", () => {
    console.log("Connected to db")

    const sandwichStream = db.collection('sandwiches').watch();

    sandwichStream.on('change', (change) => {
        //change.operationType depends on what change was made to the db
        pusher.trigger('sandwichChange', change.operationType, {
            _id: change.documentKey._id,
            changeData: change.updateDescription,
            insertData: change.fullDocument
        });
    });

    const FriesStream = db.collection('fries').watch();

    FriesStream.on('change', (change) => {
        //change.operationType depends on what change was made to the db
        pusher.trigger('friesChange', change.operationType, {
            _id: change.documentKey._id,
            changeData: change.updateDescription,
            insertData: change.fullDocument
        });
    });
})