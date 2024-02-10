const { Schema, model, default: mongoose } = require("mongoose");

class Address {
    constructor() {
        this.AddressSchema = new Schema({
            userId: { type: mongoose.Types.ObjectId, ref: "Users" },
            fullName: { type: String, require: true },
            mobile: { type: String, require: true },
            pincode: { type: String, require: true },
            state: { type: String, default: null, require: true },
            email: { type: String, default: null, require: true },
            city: { type: String, require: true },
            Address: { type: String, require: true },

        });
        this.AddressSchemaModel = model("Address", this.AddressSchema)

    }

    add(data) {
        return this.AddressSchemaModel.create(data);
    }


    get(id) {
        return this.AddressSchemaModel.find({ userId: id });

    }
    delete(id) {
        return this.AddressSchemaModel.deleteOne({ product_id: id });
    }

    findOne(id) {
        return this.AddressSchemaModel.findOne({ userId: id });
    }
}

const AddressModel = new Address();
module.exports = AddressModel;

