const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is Running on PORT : ${PORT}`);
})
 
const dbConnect = require('./config/dbConnect');
dbConnect();

const notesRoutes = require('./routes/orangeNotesRoutes');
app.use('/api/v1', notesRoutes);


app.get('/', (req, res) => {
    res.send(`<h1>Hi Orange Notes App is Running baby ...</h1>`);
})
