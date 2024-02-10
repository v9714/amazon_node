const { Schema, model, default: mongoose } = require("mongoose");

class PlaceOrder {
    constructor() {
        this.PlaceOrderSchema = new Schema({
            userInfo: { type: Object, required: true },
            products: { type: Array, required: true },
            Items: { type: Number, required: true },
            totalPrice: { type: String, required: true },
            shippingAddress: { type: Object, required: true },
            paymentMethod: { type: String, required: true, default: "cod" },
            paymentStatus: { type: String, required: true, default: "pending" },
            price: { type: String, required: true },
            deliveryStatus: { type: String, required: true, default: "pending" },
            deliverIn: { type: Date, require: true },
        }, { timestamps: true });

        this.PlaceOrderModel = model("PlaceOrder", this.PlaceOrderSchema)
    }

    add(data) {
        return this.PlaceOrderModel.create(data);
    }

    get(id) {
        return this.PlaceOrderModel.find({ _id: id });
    }
    delete(id) {
        return this.PlaceOrderModel.deleteOne({ product_id: id });
    }

    findOne(id) {
        return this.PlaceOrderModel.findOne({ userId: id });
    }
    update(id, data) {
        return this.PlaceOrderModel.updateOne(id, data);
    }
}

const PlaceOrderModel = new PlaceOrder();
module.exports = PlaceOrderModel;

