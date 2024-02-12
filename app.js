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
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(express.json());
Connectdb();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
    exposedHeaders: ['Set-Cookie', 'Date', 'ETag']
}));
app.use(bodyParser.urlencoded({ extended: true }));

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
