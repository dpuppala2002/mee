const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Sample in-memory product array (replace with a database in a real-world scenario)
let products = [
    { id: 1, name: 'Premium Cosmetics Set', price: 49.99 },
    { id: 2, name: 'Stylish Watch', price: 59.99 },
    { id: 3, name: 'Adventure Backpack', price: 79.99 },
];

app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// API endpoint to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// API endpoint to add a new product
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    res.json(newProduct);
});

// API endpoint to update a product
app.put('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
    const index = products.findIndex(product => product.id === productId);

    if (index !== -1) {
        products[index] = { id: productId, name, price };
        res.json(products[index]);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// API endpoint to delete a product
app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(product => product.id === productId);

    if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0];
        res.json(deletedProduct);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
