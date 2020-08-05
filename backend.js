const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let products = [

];

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/products/:id', (req, res) => {
    for (let product of products) {
        if (product.id === req.params.id) {
            res.send(product);
        }
    }
})
app.post('/products', (req, res) => {
    products.push(req.body);
    res.send(req.body);
});

app.put('/products/:id', (req, res) => {
    products.forEach((product, i) => {
        if (product.id === req.params.id) {
            products[i] = req.body;
            res.send(req.body);
        }
    });
});

app.delete('/products/:id', (req, res) => {
    products.forEach((product, i) => {
        if (product.id === req.params.id) {
            products.splice(i, 1);
            res.send('DELETED');
        }
    });
});

app.listen(3000);