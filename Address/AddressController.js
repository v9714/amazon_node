const AddressModel = require("./AddressModel");


class Address_Controller {

    async addAddress(req, res) {
        try {
            const { userId, fullName, mobile, pincode, state, email, city, Address } = req.body
            if (!userId || !fullName || !mobile || !pincode || !state || !email || !city || !Address) return res.status(400).send({ message: "Messing feilds..!" });
            const result = await AddressModel.add(req.body)
            if (result) {
                return res.status(200).send({ message: "Success", address: result })
            }
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" });
        }
    }
    async getAddress(req, res) {
        try {
            const { id } = req.params;
            const result = await AddressModel.get(id)
            if (result) return res.status(200).send({ message: "Success", address: result })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async DeleteAddress(req, res) {
        try {
            const { id } = req.params;
            const result = await AddressModel.delete(id)
            if (result) return res.status(200).send({ message: "Success", address: result })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

}

const AddressController = new Address_Controller()
module.exports = AddressController;