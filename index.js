// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Enable CORS with options
app.use(cors({
  origin: 'https://cookies-self-three.vercel.app', // Replace with your Next.js app URL
  credentials: true, // Allow credentials (cookies)
}));

// Middleware to parse cookies
app.use(cookieParser());

// Route to set a cookie with SameSite=None and Secure attributes
app.get('/set-cookie', (req, res) => {
  res.cookie('myCookie', 'cookieValue', {
    maxAge: 900000,      // Cookie expires after 15 minutes
    httpOnly: true,      // Ensures the cookie is only accessible by the server
    secure: true,        // Ensures the cookie is sent only over HTTPS
    sameSite: 'none',    // Allows the cookie to be sent cross-site
  });
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
