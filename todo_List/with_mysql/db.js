const mysql = require('mysql');
var connection = '';


function connect() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'test',
        password: 'root',
        database: 'notes'
    });
    connection.connect();
    console.log('connected to server successfully.');
}

function add(a, b, cb) {
    connection.query(`insert into tasks(todo,status) values ('${a}',${b});`, (err, results, fields) => {
        if (err) {
            console.error(err);
        }
        console.log(results);
        cb(results.insertId);

    })
}

function del(id, cb) {
    connection.query(`delete from tasks where id='${id}';`, (err, results, fields) => {
        // console.log(results);
        cb();

    })
}
function update_status(id, status, cb) {
    connection.query(`update tasks set status = ${status} where id = ${id};`, (err, results, fields) => {
        // console.log("working fine in update_status.");
        // console.log(results);
        cb();
    })
}
function update_todo(id, todo, cb) {
    console.log("update todo working fine.");
    connection.query(`update tasks set todo = '${todo}' where id = ${id};`, (err, results, fields) => {
        // console.log("working fine in update_status.");
        // console.log(results);
        cb();
    })
}
function get_all_data(cb) {
    connection.query(`SELECT * FROM tasks;`, (err, results, fields) => {
        // console.log("working fine in update_status.");
        // console.log(results);
        cb(results);
    })
}

module.exports = {
    connect: connect,
    add: add,
    delete: del,
    update_status: update_status,
    update_todo: update_todo,
    get_data: get_all_data
};
