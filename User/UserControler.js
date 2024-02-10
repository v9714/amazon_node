
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserModel = require("./UserModel");


class UserControler {

    async RegiseterUser(req, res) {
        try {
            const { password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const createUser = await UserModel.CreateUser({ ...req.body, password: hashedPassword })
            let paylod = {
                firstName: createUser.firstName,
                lastName: createUser.lastName,
                email: createUser.email,
                phone: createUser.phone,
                _id: createUser._id,
            }
            const token = jwt.sign(paylod, process.env.JWT_secretKey, { expiresIn: '1h' });
            if (!createUser) {
                return res.status(500).send({ message: "Somthing went wrong" })
            }
            res.cookie('user', token, { maxAge: 360000 });
            return res.status(200).send({ message: "Success", token: token });
        } catch (error) {
            console.log(error);
            if (error && error.message && error.message.includes("E11000")) {
                return res.status(400).send({ message: "Email is Allready Exist" })
            }
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async LoginUser(req, res) {
        try {
            const { email, password } = req.body
            const user = await UserModel.LoginUser(email)
            if (!user) { return res.status(400).send({ message: "Email not exist" }) }
            if (!(bcrypt.compareSync(password, user.password))) {
                return res.status(400).send({ message: "Incorrect email or passwrod" })
            }
            delete user.password
            let paylod = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                _id: user._id,
            }
            const token = jwt.sign(paylod, process.env.JWT_secretKey, { expiresIn: '20h' });
            user.tokens.push(token);
            await user.save();
            // res.cookie('user', token);
            const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
            const expirationTime = new Date(Date.now() + oneHour); // Calculate the expiration time

            res.cookie('user', token, { expires: expirationTime });
            if (token) {
                return res.status(200).send({ message: "Success", token: token })
            }
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            return res.status(500).send({ message: "Internal server error" })
        }
    }






}
const userControler = new UserControler()
module.exports = userControler;