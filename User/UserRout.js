// const express = require("express")
const express = require("express")

const userControler = require("./UserControler")

const userRouter = express.Router()
userRouter.post('/createuser',userControler.RegiseterUser)
userRouter.post('/loginUser',userControler.LoginUser)

module.exports = userRouter