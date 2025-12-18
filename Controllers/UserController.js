const User = require("../Models/UserModel");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        
        res.status(200).json({
            status: "Success",
            data: users
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }
        
        res.status(200).json({
            status: "Success",
            data: user
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }
        
        await User.findByIdAndDelete(req.params.id);
        
        res.status(204).json({
            status: "Success",
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};