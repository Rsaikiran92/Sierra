const express = require("express");
const { register, login } = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/register", register); //post request for user registration
userRouter.post("/login", login); // post request for user login

exports.userRouter = userRouter;
