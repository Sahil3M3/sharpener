const Sequelize = require("sequelize");
const Product = require('../models/product');

module.exports.getProduct = (req, res, next) => {
    Product.findAll({
        productName:"AC"
    })
        .then(products => res.json(products))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch products' });
        });
};

module.exports.addProduct = (req, res, next) => {
    const { productName, description, price, quantity } = req.body;

    Product.create({ productName, description, price, quantity })
        .then(product => res.status(201).json({ id: product.id }))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to create product' });
        });
};

module.exports.deleteProduct = (req, res, next) => {
    const id = req.params.id;

    Product.findByPk(id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            return product.destroy()
                .then(() => res.status(204).send())
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ error: 'Failed to delete product' });
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to find product' });
        });
};

module.exports.editProduct = (req, res, next) => {
    const id = req.params.id;
    const { productName, description, price, quantity } = req.body;

    Product.findByPk(id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            product.productName = productName;
            product.description = description;
            product.price = price;
            product.quantity = quantity;
            return product.save()
                .then(updatedProduct => res.json(updatedProduct))
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ error: 'Failed to update product' });
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to find product' });
        });
};
