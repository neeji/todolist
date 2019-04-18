const express = require('express');
const app = express();
var input_data = {};
app.use('/', express.static("webpages"));

// api for getting data when the user hit add note button
app.get('/add_note', function (req, res) {
    console.log(req.query);
    input_data[req.query.k] = req.query.q;
    return res.sendStatus(200);
})
// api for deleting existing keys
app.get('/delete', function (req, res) {
    // console.log(req.query);
    delete input_data[req.query.k];
    console.log("After deleting the new input data is as following:");
    console.log(input_data);
    return res.sendStatus(200);
})

//api for updating the value on hit of update button
app.get('/update', function (req, res) {
    // console.log(req.query);
    input_data[req.query.k] = req.query.q;
    console.log("After updating the input data is as following:");
    console.log(input_data);
    return res.sendStatus(200);
})

//listen to the port defined
app.listen(5050, function () {
    console.log("listening on the port 5050");
    console.log(input_data);
})