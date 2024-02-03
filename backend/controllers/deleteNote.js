const noteSchema = require('../models/noteSchema');
const userSchema = require('../models/userSchema');

exports.deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        if (!noteId) {
            return res.status(401).json({
                success: false,
                messsage: "Note id Not matched with DB to delete, try Again"
            })
        }
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                messsage: "User Not found, login again"
            })
        }
        await noteSchema.findByIdAndDelete(noteId);

        const user = await userSchema.findByIdAndUpdate(userId,
            {
                $pull: {
                    notes: noteId
                }
            },
            { new: true });

        return res.status(200).json({
            success: true,
            message: "Note Deleted",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Deleting Note",
            error: error.message
        })
    }
}