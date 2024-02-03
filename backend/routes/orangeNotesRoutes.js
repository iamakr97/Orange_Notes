const express = require('express');
const router = express.Router();

const { signupUser } = require('../controllers/signupUser');
const { loginUser, logoutUser } = require('../controllers/loginUser');
const { auth, isUser } = require('../middlewares/auth');
const { createNote } = require('../controllers/createNote');
const { myNotes } = require('../controllers/myNotes')
const { deleteNote } = require('../controllers/deleteNote');
const { editNote } = require('../controllers/editNote');
const { isTokenValid } = require('../middlewares/isTokenValid');



router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/createnote', auth, isUser, createNote);
router.get('/myNotes', auth, isUser, myNotes);
router.get('/logout', auth, logoutUser);
router.delete('/myNotes/:id', auth, deleteNote)
router.put('/myNotes/:id', auth, editNote);
router.get('/isTokenValid', isTokenValid);

module.exports = router;