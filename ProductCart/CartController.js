const productCartModel = require("./CartModel")


class Product_Cart_Controller {

    async addCart(req, res) {
        try {
            const { product_id, productQuantity, userId } = req.body
            if (!product_id || !productQuantity || !userId) return res.status(400).send({ message: "Messing feilds..!" });
            const result = await productCartModel.addCart(req.body)
            if (result) {
                return res.status(200).send({ message: "Success", productsCart: result })
            }
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            if (error.code === 11000) {
                return res.status(400).send({ message: "Product already added in the cart" });
            }
            return res.status(500).send({ message: "Internal server error" });
        }
    }
    async getCart(req, res) {
        try {
            const { id } = req.params;
            const result = await productCartModel.getCart(id)
            if (result) return res.status(200).send({ message: "Success", productsCartByUserId: result })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async DeleteCart(req, res) {
        try {
            const { id } = req.params;
            const result = await productCartModel.deleteCart(id)
            if (result) return res.status(200).send({ message: "Success", productsCartByUserId: result })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

}

const productCart = new Product_Cart_Controller()
module.exports = productCart;