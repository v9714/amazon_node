const mongoose = require("mongoose")

async function Connectdb() {
    try {
        // await mongoose.connect(`mongodb://localhost:27017/Amazon`)
        // await mongoose.connect(`mongodb+srv://${process.env.DB_UNAME}:${process.env.DB_PASS}%40123@camazon.uq5bagq.mongodb.net/`)
        await mongoose.connect("mongodb+srv://online_amazon:kartiksinh%40123@camazon.uq5bagq.mongodb.net/amazon",{useNewUrlParser: true})


        console.log("DB Connected")

    } catch (error) {
        console.log(error)
        console.log("DB Connection Loss")
    }
}

module.exports = Connectdb;
