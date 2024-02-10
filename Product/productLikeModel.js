const mongoose = require("mongoose");

class ProductLike {
    constructor() {
        this.productLikeSchema = mongoose.Schema({
            userid: { type: String, ref: "Users" },
            productId: { type: String, }
        });

        // this.productLikeSchema.index({ productId: 1 }, { unique: true, background: true });
        this.ProductLikeModel = mongoose.model("ProductLike", this.productLikeSchema);
    }

    getLike(id) {
        return this.ProductLikeModel.find({ userid: id });
    }

    addLike(data) {
        return this.ProductLikeModel.create(data);
    }
}

const productLike = new ProductLike();
module.exports = productLike;


