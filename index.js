// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import CORS
const app = express();
const PORT = 3000;

// Enable CORS with options
app.use(cors({
  origin: 'http://localhost:3001', // Replace with the URL of your Next.js app
  credentials: true, // Allow credentials (cookies)
}));

// Middleware to parse cookies
app.use(cookieParser());

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('myCookie', 'cookieValue', { maxAge: 900000, httpOnly: true });
  res.send('Cookie has been set!');
});

// Route to check if the cookie exists
app.get('/check-cookie', (req, res) => {
  const myCookie = req.cookies.myCookie;
  if (myCookie) {
    res.send(`Cookie value: ${myCookie}`);
  } else {
    res.send('No cookie found.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
