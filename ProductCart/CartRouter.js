const productCart = require('./CartController');
const cartRouter = require('express').Router();

cartRouter.post("/add", productCart.addCart);
cartRouter.get("/get/:id", productCart.getCart);
cartRouter.delete("/delete/:id", productCart.DeleteCart);

module.exports = cartRouter;
