const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

let db = new sqlite3.Database('./test.db', (err) => {
    if(err) {
        console.log(err);
        throw err;
    }
    console.log('successfully connected to the database');
});

app.get('/getEmails/:customer_id', (req, res) => {
    var sql = `SELECT * FROM email_log WHERE customer_id=?`;
    var customer_id = req.params.customer_id;
    var results = [];
    db.all(sql, [customer_id], (err, row) => {
        if(err) {
            throw err;
        }
        row.forEach((row) => {
            results.push(row);
            console.log(row);
        });
        res.json(results);
    });
});

app.get('/getEmailMessage/:message_id', (req, res) => {

    res.send('/getEmailMessage/:message_id');
});

app.get('/getEmailEvents/:message_id', (req, res) => {
    console.log('here');
    var sql = `SELECT * FROM email_event_log WHERE message_id=?`;
    var message_id = req.params.message_id;
    var results = [];
    db.all(sql, [message_id], (err, row) => {
        if(err) {
            throw err;
        }
        row.forEach((row) => {
            results.push(row);
            console.log(row);
        });
        res.json(results);
    });
});

app.listen(port, ()=> console.log('listening'));
