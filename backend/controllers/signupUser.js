const userSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.signupUser = async (req, res) => {
    try {
        const { name, username, password, role } = req.body;
        if (!name || !username || !password) {
            return res.status(401).json({
                success: false,
                message: "Please Enter all the details"
            })
        }
        const existingUser = await userSchema.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already Exits"
            });
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in Hashing Password"
            });
        }

        const user = await userSchema.create({
            name, username, password: hashedPassword, role
        })
        return res.status(200).json({
            success: true,
            message: "User created Successfully",
            user
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
