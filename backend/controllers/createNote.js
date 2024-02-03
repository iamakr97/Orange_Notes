const noteSchema = require('../models/noteSchema');
const userSchema = require('../models/userSchema');

exports.createNote = async (req, res) => {
    try {
        // destructuting the reqest body to get the fields and checking for empty fields...
        const { title, description, createdAt } = req.body;

        if (!title || !description) {
            return res.status(401).json({
                success: false,
                message: "Please fill all the details"
            })
        }
        // userId of logged in user which we got from jwt payload 
        const userId = req.user.id;


        const newNotes = new noteSchema({title, description, createdAt, user: userId});

        await newNotes.save();
        // updating user , notes id field 
        await userSchema.findByIdAndUpdate(
            {_id: userId},
            {
                $push: {
                    notes: newNotes._id
                }
            },
            {new: true}
        );
        return res.status(200).json({
            success: true,
            message: "Notes created",
            newNotes,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Problem in creating new Notes.",
            error: error.message
        })
    }
}