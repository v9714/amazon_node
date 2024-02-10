const { Schema, model, default: mongoose } = require("mongoose");

class ChackOut {
    constructor() {
        this.ChackOutSchema = new Schema({
            userId: { type: mongoose.Types.ObjectId, ref: "Users" },
            products: { type: Object },
            totalIteams: { type: Number },
            totalAmount: { type: String },
            address: { type: mongoose.Types.ObjectId, default: null },
            paymet: { type: String, default: null },
            chackout: { type: Boolean, default: false },

        }, {
            timestamps: true
        });
        this.chackOutModel = model("chackOut", this.ChackOutSchema)

    }

    add(data) {
        return this.chackOutModel.create(data);
    }

    get(id) {

        return this.chackOutModel.find({ userId: id, chackout: false });

    }
    delete(id) {
        return this.chackOutModel.deleteOne({ product_id: id });
    }

    findOne(id) {
        return this.chackOutModel.findOne({ userId: id });
    }
    update(id, data) {
        return  this.chackOutModel.updateOne(id, { $set: data });
    }
}

const chackOutModel = new ChackOut();
module.exports = chackOutModel;

