const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["Admin", "User"],
            default: "User"
        },
        notes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "noteSchema"
            }
        ]
    }
);

module.exports = mongoose.model("userSchema", userSchema);