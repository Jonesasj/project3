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
app.use('/', (req, res, next) => {
    console.log('request');
    console.log(req.originalUrl);
    next();
});

app.get('/getEmails', (req, res) => {
    var sql = `SELECT * FROM email_log`;
    var results = {
        dataList: []
    };

    db.all(sql, [], (err, row) => {
        if(err) {
            throw err;
        }
        row.forEach((row) => {
            results.dataList.push(row);
            console.log(row);
        });
        res.json(results);
    })
})

app.get('/getEmails/:customer_id', (req, res) => {
    var sql = `SELECT * FROM email_log WHERE customer_id=?`;
    var customer_id = req.params.customer_id;
    var results = {
        dataList: []
    };

    db.all(sql, [customer_id], (err, row) => {
        if(err) {
            throw err;
        }
        row.forEach((row) => {
            results.dataList.push(row);
            console.log(row);
        });
        res.json(results);
    });
});

app.get('/getEmailMessage/:message_id', (req, res) => {

    console.log('here');
    var sql = `SELECT * FROM email_log WHERE message_id=?`;
    var message_id = req.params.message_id;
    var results = {
        dataList: []
    };

    db.all(sql, [message_id], (err, row) => {
        if(err) {
            throw err;
        }
        row.forEach((row) => {
            results.dataList.push(row);
            console.log(row);
        });
        res.json(results);
    });
});

app.get('/getEmailEvents/', (req, res) => {
    console.log('getEmailEvents');
    var sql = `SELECT * FROM email_event_log`;
    var results = {
        dataList: []
    };
    db.all(sql, [], (err, row) => {
        if(err) {
            throw err;
        }
        row.forEach((row) => {
            results.dataList.push(row);
            console.log(row);
        });
        console.log(results);
        res.json(results);
    });
});

app.get('/getEmailEvents/:message_id', (req, res) => {
    console.log('getEmailEvents');
    var sql = `SELECT * FROM email_event_log WHERE message_id=?`;
    var message_id = req.params.message_id;
    var results = {
        dataList: []
    };
    db.all(sql, [message_id], (err, row) => {
        if(err) {
            throw err;
        }
        row.forEach((row) => {
            results.dataList.push(row);
            console.log(row);
        });
        console.log(results);
        res.json(results);
    });
});

app.get('/getEmailEvent/:event_id', (req, res) => {
    console.log('getEmailEvents/:event_id');
    var sql = `SELECT * FROM email_event_log WHERE event_id=?`;
    var event_id = req.params.event_id;
    var results = {
        dataList: []
    };
    db.all(sql, [event_id], (err, row) => {
        if(err) {
            throw err;
        }
        row.forEach((row) => {
            results.dataList.push(row);
            console.log(row);
        });
        console.log(results);
        res.json(results);
    });
});

app.listen(port, ()=> console.log('listening'));
