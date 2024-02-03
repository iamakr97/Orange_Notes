const noteSchema = require('../models/noteSchema');

exports.editNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        console.log(noteId)
        if (!noteId) {
            return res.status(401).json({
                success: false,
                message: "Note not found in DB to edit, try again"
            })
        }
        const { title, description, createdAt } = req.body;

        if (!title || !description) {
            return res.status(401).json({
                success: false,
                message: "Please fill all the details to edit"
            })
        }
        await noteSchema.findByIdAndUpdate(noteId, { title, description, createdAt: Date.now() }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Note updated Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Problem in Editin Note.",
            error: error.message
        })
    }
}