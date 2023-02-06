const express = require('express');
const app = express();
const bparser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', '.');
app.use(bparser.urlencoded());
app.use(session({secret: 'wap_w4d1node'}));

app.get('/', (req, res) => {
    res.render('form');
});

app.post('/result', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    if (!name) {
        name = "person";
    }
    if (!age) {
        age = 1;
    }
    req.session.name = name;
    req.session.age = age;
    res.redirect('/output');
});

app.get('/output', (req, res) => {
    let name = req.session.name;
    let age = req.session.age;
    if (!name) {
       name = "person";
    }
    if (!age) {
       age = 1;
    }
    res.render('output', {name: name, age: age});
});

app.listen(3000);