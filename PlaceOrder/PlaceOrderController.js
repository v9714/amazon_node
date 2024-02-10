const Razorpay = require("razorpay");
const PlaceOrderModel = require("./PlaceOrderModel");
const chackOutModel = require("../Chackout/ChackoutModel");
const productCartModel = require("../ProductCart/CartModel");
const productModel = require("../Product/productModel");

class PlaceOrder_Controller {
    async addPlaceOrder(req, res) {
        try {
            const { userInfo, products, Items, totalPrice, shippingAddress, paymentMethod } = req.body;
            if (!userInfo || !products || !Items || !totalPrice || !shippingAddress) return res.status(400).send({ message: "Missing fields..!" });
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 5);
            const OrderDetails = {
                userInfo: userInfo,
                paymentMethod: paymentMethod,
                products: products,
                shippingAddress: shippingAddress,
                totalPrice: totalPrice,
                Items: Items,
                price: totalPrice,
                deliveredIn: deliveryDate, // Corrected typo
            };
            let order = await PlaceOrderModel.add(OrderDetails);
            if (order) {
                order = { ...order._doc, RazorpayDetails: null };
                if (paymentMethod === "cod") {
                    if (!order) return res.status(500).send({ message: "Something went wrong" });
                    return res.status(200).send({ message: "Success", order });
                } else {
                    var instance = new Razorpay({
                        key_id: process.env.API_KEY,
                        key_secret: process.env.KEY_SECRET,
                    });
                    const options = {
                        amount: +totalPrice * 100,
                        currency: "INR",
                        receipt: "rcpt_id_" + order._id
                    };

                    const RazorpayResult = await instance.orders.create(options);
                    if (RazorpayResult && RazorpayResult.id) {
                        order = {
                            ...order,
                            RazorpayDetails: { ...RazorpayResult, apikey: process.env.API_KEY }
                        };
                        return res.status(200).send({ message: "Success", order });
                    } else {
                        return res.status(500).send({ message: "Something went wrong with Razorpay" });
                    }
                }
            }
            return res.status(500).send({ message: "Something went wrong" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server error" });
        }
    }

    async PaymentVerify(req, res) {
        try {
            const { razorpay_payment_id, razorpayOrderId, orderId, userid, produs_delete } = req.body;
            const instance = new Razorpay({
                key_id: process.env.API_KEY,
                key_secret: process.env.KEY_SECRET,
            });

            // Fetch payment details from Razorpay
            const response = await instance.payments.fetch(razorpay_payment_id);
            if ((response.status === "captured" || response.status === "authorized") && response.order_id === razorpayOrderId) {
                const update = await PlaceOrderModel.update({ _id: orderId }, { paymentStatus: "verify" });
                await productCartModel.deleteMany(userid)
                await chackOutModel.update({ userId: userid, chackout: false }, { paymet: "verify", chackout: true });



                const updateOperations = Object.keys(produs_delete).map(id => ({
                    updateOne: {
                        filter: { _id: id },
                        update: {
                            $inc: { countInstock: -produs_delete[id] }
                        }
                    }
                }));

                try {
                    const result = await productModel.product.bulkWrite(updateOperations);
                    console.log(result, "result");
                } catch (error) {
                    console.error("Update error:", error);
                }











                if (update.modifiedCount > 0) {
                    return res.status(200).json({ message: "Payment verification successful", orderId: orderId });
                } else {
                    return res.status(500).json({ message: "Failed to update order status" });
                }
            } else {
                await PlaceOrderModel.update({ _id: orderId }, { paymentStatus: "reject" });
                await chackOutModel.update({ userId: userid, chackout: false }, { paymet: "verify", chackout: true });
                await productCartModel.deleteMany(userid)


                return res.status(400).json({ message: "Payment verification failed" });
            }
        } catch (error) {
            console.error("Payment verification error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    async getPlaceOrder(req, res) {
        try {
            const { id } = req.params;
            const result = await PlaceOrderModel.get(id)
            if (result) return res.status(200).send({ message: "Success", address: result })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async DeletePlaceOrder(req, res) {
        try {
            const { id } = req.params;
            const result = await PlaceOrderModel.delete(id)
            if (result) return res.status(200).send({ message: "Success", address: result })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

}

const placeOrderController = new PlaceOrder_Controller()
module.exports = placeOrderController;