const mongoose = require('mongoose')

class ProductModel {
    constructor() {
        this.schema = new mongoose.Schema({
            alias: { type: String, require: true, unique: true },
            title: { type: String, require: true },
            category: { type: String, require: true },
            image: { type: String, require: true },
            price: { type: Number, require: true },
            rating: { type: Number, require: true },
            NumReviews: { type: Number, require: true },
            description: { type: String, require: true, default: null },
            countInstock: { type: Number, require: true }

        })
        this.product = mongoose.model("product", this.schema)
    }
    inn(data) {
        return this.product.create(data)
    }
    getProduct() {
        return this.product.find({})
    }
    getProductByCarts(data) {
        return this.product.find({ _id: data });
    }
    getProductId(id) {
        return this.product.findOne({ _id: id })
    }
    // update(id, data) {
    //     return  this.chackOutModel.updateOne(id, { $set: data });
    // }

    async update(data) {
        const result = await ProductModel.bulkWrite(data);
        console.log(result);

    }


}
const productModel = new ProductModel()
module.exports = productModel