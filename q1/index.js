const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded());
app.set('view engine', 'ejs');
app.set('views', '.');
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index', {cookies: req.cookies});
});

app.post('/', (req, res) => {
    if(req.body.cookie_key && req.body.cookie_value) {
        res.cookie(req.body.cookie_key, req.body.cookie_value);
    }
    res.redirect('/');
});

app.listen(3000);