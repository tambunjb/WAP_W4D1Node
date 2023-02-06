const express = require('express');
const app = express();
const bparser = require('body-parser');
const session = require('express-session');

const products = require('./products.js');
const e = require('express');

app.set('view engine', 'ejs');
app.set('views', '.');
app.use(bparser.urlencoded());
app.use(session({secret: 'wap_w4d1node_q34'}))

app.get('/product', (req, res) => {
    res.render('product', products[Math.round(Math.random()*(products.length-1))]);
});

app.post('/addToCart', (req, res) => {
    let id = req.body.id;
    
    if(!req.session.cart) req.session.cart = [];

    if(!req.session.cart.find(c => c.id == id)){
        req.session.cart.push({ ...products.find(p => p.id == id), quantity: 1 });
    } else {
        req.session.cart = req.session.cart.map(c => c.id==id?{...c, quantity: ++c.quantity}:c);
    }

    res.redirect('cart');
});

app.get('/cart', (req, res) => {
    res.render('cart', {products: req.session.cart??[]});
});

app.listen(3000);