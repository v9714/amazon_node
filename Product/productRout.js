const express = require('express');
const productController = require('./productControler');
const productRouter = express.Router();

// Define the routes
productRouter.get('/', productController.getProduct);
productRouter.post('/bycarts', productController.getProductByCarts);
productRouter.post('/like', productController.productLike);
productRouter.get('/getlike/:id', productController.getProductLike);
productRouter.post('/:id', productController.getProductId);

// productRouter.post('/insert',productController.insertProducts);

module.exports = productRouter;
