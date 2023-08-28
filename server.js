const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// Serve our static assets
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/playlist', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'playlist.html'));
});

// endpoint to come
// ...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, go get 'em!`);
});

