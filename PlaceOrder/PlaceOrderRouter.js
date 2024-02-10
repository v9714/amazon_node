const placeOrderController = require('./PlaceOrderController');

const PlaceOrder = require('express').Router();

PlaceOrder.post("/add", placeOrderController.addPlaceOrder);
PlaceOrder.post("/paymentverify", placeOrderController.PaymentVerify);

PlaceOrder.get("/get/:id", placeOrderController.getPlaceOrder);
PlaceOrder.delete("/delete/:id", placeOrderController.DeletePlaceOrder);

module.exports = PlaceOrder;
