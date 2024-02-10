const chackOutController = require('./ChackoutController');

const chackOutut = require('express').Router();

chackOutut.post("/add", chackOutController.addchaCkOutut);
chackOutut.get("/get/:id", chackOutController.getchaChackout);
chackOutut.delete("/delete/:id", chackOutController.DeleteChackOutut);

module.exports = chackOutut;
