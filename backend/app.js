const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const SkillSwapRoutes = require('./routes/skillSwap.routes');
const SkillRoutes = require('./routes/skills.routes');
const MessagesRoutes = require('./routes/messages.routes')

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) =>{
    return res.send("hello world");
})
app.use("/users", userRoutes);
app.use("/skillswap", SkillSwapRoutes);
app.use("/skill", SkillRoutes);
app.use("/messages", MessagesRoutes)

module.exports = app;
