const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let products = [
    {
        id: '1111',
        name: 'Milk',
        amount: 5
    },
    {
        id: '2222',
        name: 'Bread',
        amount: 2
    }
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

app.get('/', (req, res) => {
    res.send('Hello World');
});

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