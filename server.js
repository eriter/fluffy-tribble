const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// Serve our static assets
app.use(express.static('public'));

app.use(express.json());

// routes
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'playlist.html'));
});

// In-memory data structure to track visibility
const videoVisibility = {};

// Update visibility status per video
app.patch('/api/videos/:hashedId/visibility', (req, res) => {
  const hashedId = req.params.hashedId;
  const visibility = req.body.visibility;

  videoVisibility[hashedId] = visibility;

  res.json({ success: true });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, go get 'em!`);
});

