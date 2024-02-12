const express = require("express")
const cookieParser = require('cookie-parser');
const app = express()
const Connectdb = require('./dbconnection.js')

const cors = require('cors')
const userRouter = require("./User/UserRout.js");
const productRouter = require("./Product/productRout.js");
const cartRouter = require("./ProductCart/CartRouter.js");
const chackOutut = require("./Chackout/ChackoutRouter.js");
const Address = require("./Address/AddressRouter.js");
const PlaceOrder = require("./PlaceOrder/PlaceOrderRouter.js");
require('dotenv').config();

app.use(express.json());
Connectdb();
app.use(cors({
    origin: process.env.origin,
    // credentials: process.env.credentials,
    // withCredentials: true,
      credentials: false,
    withCredentials: false,
}));
app.use(cookieParser());

// Routs 
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/chackout', chackOutut);
app.use('/address', Address);
app.use('/PlaceOrder',PlaceOrder)


app.get("/", (req, res) => {
    return res.status(200).send({ Message: "Success" });
});



const port = 5000
app.listen(port, (req, res) => {
    console.log(` Server started \n       http://localhost:${port}`)
});
