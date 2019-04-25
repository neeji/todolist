const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const app = express();
app.use('/', express.static('webpages'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

const port = process.env.port || 5000;

app.post('/add_note', (req, res) => {
    // console.log(req.headers);
    // console.log("hello world");
    db.add(req.body.a, req.body.b, (data) => {
        var obj = {};
        obj['id'] = data;
        obj['todo'] = req.body.a;
        obj['done'] = false;
        obj['status'] = 200;
        res.send(JSON.stringify(obj));
    })
})

app.post('/delete_note', (req, res) => {
    db.delete(req.body.a, () => {
        res.sendStatus(200);
    });
})
app.post('/update_status', (req, res) => {
    db.update_status(req.body.a, req.body.b, () => {
        res.sendStatus(200);
    })
})
app.post('/update_todo', (req, res) => {
    db.update_todo(req.body.a, req.body.b, () => {
        res.sendStatus(200);
    })
})

app.post('/get_data', (req, res) => {
    db.get_data((data) => {
        res.send(data);
    })
})

app.listen(port, () => {
    console.log(`listening on port : ${port}.`);
    db.connect();
})