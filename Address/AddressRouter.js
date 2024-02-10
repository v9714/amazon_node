const AddressController = require('./AddressController');

const Address = require('express').Router();

Address.post("/add", AddressController.addAddress);
Address.get("/get/:id", AddressController.getAddress);
Address.delete("/delete/:id", AddressController.DeleteAddress);

module.exports = Address;
