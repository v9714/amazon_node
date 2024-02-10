const mongoose = require('mongoose');

class UserModel {
    constructor() {
        this.User = new mongoose.Schema({
            firstName: { type: String, maxlength: 20, required: true },
            lastName: { type: String, maxlength: 20, required: true },
            phone: { type: String, maxlength: 10, default: null },
            isAdmin: { type: Boolean, default: false },
            email: { type: String, maxlength: 50, required: true, unique: true },
            password: { type: String, required: true },
            tokens: [{
                type: String, default: null
            }],
            carts_items: { type: String, default: null }
        }, {
            timestamps: true
        });

        this.userModel = mongoose.model("Users", this.User);
    }
    CreateUser(data) {
        return this.userModel.create(data)
    }
    LoginUser(data) {
        return this.userModel.findOne({ email: data })
    }

}
const userModel = new UserModel()
module.exports = userModel;
