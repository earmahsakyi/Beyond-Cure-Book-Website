require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');




const app = express();

//connect database
connectDB();

//body paser
app.use(express.json({extended: false}));


//root route 
app.get('/', (req, res) => res.send({msg: 'Welcome to Bookwebsite API...'}));


//Define routes
app.use('/api/auth',require('./route/auth'));
app.use('/api/home-content',require('./route/homeContent'));
app.use('/api/email-subscribers',require('./route/emailSubscribe'));
app.use('/api/contact',require('./route/contactMessage'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on:${PORT}`));
