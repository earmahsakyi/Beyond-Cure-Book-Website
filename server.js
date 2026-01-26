require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
const {apiLimiter} = require('./middleware/rateLimiter');
const getClientIp = require('./middleware/getClientIp');
const path = require("path");
const helmet = require('helmet');
const cors = require('cors');
const cookieParser =require ('cookie-parser')




const app = express();



//connect database
connectDB();

//body paser
app.use(express.json({extended: false}));
app.use(cookieParser())

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://ui-avatars.com",
          "https://*.amazonaws.com",
          "https://*.s3.amazonaws.com",
        ],
        connectSrc: ["'self'", "ws:", "wss:"],
        fontSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
  })
);


// Trust proxy - IMPORTANT for getting real IP addresses behind reverse proxies/load balancers
app.set('trust proxy', 1);

// CORS
app.use(cors(
  {
  origin: 'http://localhost:3000',
  credentials: true
}
));


// Extract client IP for all routes
app.use(getClientIp);

// Apply general rate limiting to all API routes
app.use('/api/', apiLimiter);

//root route 
app.get('/api/', (req, res) => res.send({msg: 'Welcome to Bookwebsite API...'}));


//Define routes
app.use('/api/auth',require('./route/auth'));
app.use('/api/home-content',require('./route/homeContent'));
app.use('/api/email-subscribers',require('./route/emailSubscribe'));
app.use('/api/contact',require('./route/contactMessage'));
app.use('/api/resources',require('./route/resources'));

// Serve frontend build (important for Railway deployment)
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// For all other routes (non-API), return React index.html (for React Router)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on:${PORT}`));
