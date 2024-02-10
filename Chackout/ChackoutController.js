const chackOutModel = require("./ChackoutModel");

class ChackOut_Controller {

    async addchaCkOutut(req, res) {
        try {
            const { userId, products } = req.body
            if (!userId || !products) return res.status(400).send({ message: "Messing feilds..!" });
            const result = await chackOutModel.add(req.body)
            if (result) {
                return res.status(200).send({ message: "Success", chackout: result })
            }
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            if (error.code === 11000) {
                return res.status(400).send({ message: "Product already ChackOut" });
            }
            return res.status(500).send({ message: "Internal server error" });
        }
    }
    async getchaChackout(req, res) {
        try {
            const { id } = req.params;
            const result = await chackOutModel.get(id)
            if (result) return res.status(200).send({ message: "Success", chackoutById: result })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async DeleteChackOutut(req, res) {
        try {
            const { id } = req.params;
            const result = await productCartModel.delete(id)
            if (result) return res.status(200).send({ message: "Success", chackout: result })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

}

const chackOutController = new ChackOut_Controller()
module.exports = chackOutController;