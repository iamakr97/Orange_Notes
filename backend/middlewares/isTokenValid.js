
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.isTokenValid = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "istokenValid: Token is Missing"
            });
        }
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            return res.status(200).json({
                success: true,
                message: "Token is Valid",
                payload
            })
        } catch (err) {
            return res.status(401).json(
                {
                    success: false,
                    message: "isTokenValid: Token is Invalid",
                    error: err.message
                }
            );
        }
    } catch (error) {
        console.log("error in isTokenValid: ", error);
        return res.status(500).json(
            {
                success: false,
                message: "Something went Wrong while varifying token",
                error: error.message
            }
        );
    }
}