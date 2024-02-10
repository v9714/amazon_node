const { Schema, model, default: mongoose } = require("mongoose");

class ProductCart {
    constructor() {
        this.productCartSchema = new Schema({
            product_id: { type: mongoose.Types.ObjectId },
            productQuantity: { type: Number },
            userId: { type: mongoose.Types.ObjectId }
        });

        this.productCartModel = model("ProductCart", this.productCartSchema);
    }
    addCart(data) {
        return this.productCartModel.create(data);
    }
    getCart(id) {
        return this.productCartModel.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(id) }
            },
            {
                $group: {
                    _id: "$product_id",
                    quantity: { $sum: "$productQuantity" }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product_data"
                }
            },
            {
                $unwind: "$product_data"
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    product_data: 1,
                    quantity: 1
                }
            }
        ]);
    }
    deleteCart(id) {
        return this.productCartModel.deleteOne({ product_id: id });
    }
    deleteMany(id) {
        console.log(id, "id")
        return this.productCartModel.deleteMany({ userId: id });
    }

    findOne(id) {
        return this.productCartModel.findOne({ userId: id });
    }
}

const productCartModel = new ProductCart();
module.exports = productCartModel;

