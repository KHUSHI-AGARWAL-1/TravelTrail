const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


require("dotenv").config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const connectDB = require('./db/conn');
connectDB();


const User = require('./models/userSchema');
const router = require('./router/auth');

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})