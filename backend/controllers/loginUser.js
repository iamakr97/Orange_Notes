const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = require('../models/userSchema');

require('dotenv').config();

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please fill all the details "
                }
            )
        }

        let user = await userSchema.findOne({ username });
        if (!user) {
            return res.status(401).json(
                {
                    success: false,
                    message: 'User Not Registerd'
                }
            )
        }
        const payload = {
            username: user.username,
            name: user.name,
            id: user._id,
            role: user.role
        }
        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                });
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'None',
                secure: true
            }
            // console.log(token);
            res.cookie("token", token, options).status(200).json(
                {
                    success: true,
                    token: token,
                    user: user,
                    message: "User LoggedIn successfully"
                }
            );



        } else {
            return res.status(403).json(
                {
                    success: false,
                    message: "Password Incorrect"
                }
            );
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: 'Login failure'
            }
        );
    }
}

exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            success: true,
            message: "User Logged Out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}
