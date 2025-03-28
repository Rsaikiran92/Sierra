const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

//post request for user registration
const register = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await new userModel({
      name,
      email,
      password: hashPassword,
    });
    await user.save();
    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};

// post request for user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = await jwt.sign({ email: user.email }, process.env.secretKey);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error });
  }
};

module.exports = { register, login };

