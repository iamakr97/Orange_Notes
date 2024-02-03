const userSchema = require('../models/userSchema');

exports.myNotes = async(req, res) => {
    try {
        const userId = req.user.id;
        const allNotes = await userSchema.findById(userId).populate('notes').exec();
        if(!allNotes){
            return res.status(400).json({
                success: false,
                message: "user id Not found, Please try again",
            })
        }

        return res.status(200).json({
            success: true,
            message: "All notes found",
            allNotes: allNotes.notes
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Problem in fetching all notes",
            error: error.message
        })
    }
}