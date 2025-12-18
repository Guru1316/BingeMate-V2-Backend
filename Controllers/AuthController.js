const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "Failed",
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                status: "Failed",
                message: "User already exists"
            });
        }

        const user = await User.create({ 
            email: email.trim().toLowerCase(), 
            password 
        });

        res.status(201).json({
            status: "Success",
            data: {
                _id: user._id,
                email: user.email,
                token: generateToken(user._id)
            }
        });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "Failed",
                errors: errors.array()
            });
        }

        const { email, password } = req.body;
        const cleanEmail = email.trim().toLowerCase();

        const user = await User.findOne({ email: cleanEmail });
        if (!user) {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid email or password"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            status: "Success",
            data: {
                _id: user._id,
                email: user.email,
                token: generateToken(user._id)
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        
        res.status(200).json({
            status: "Success",
            data: user
        });
    } catch (err) {
        console.error("Get profile error:", err);
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};