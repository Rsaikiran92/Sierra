const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

const authMiddleware = async (req, res, next) => {

  try {
    const token = req.headers.authorization.split(" ")[1];
 
    const decode = await jwt.verify(token, process.env.secretKey);

    const user = await userModel.findOne({ email: decode.email });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized user" });
  }
};

exports.authMiddleware = authMiddleware;