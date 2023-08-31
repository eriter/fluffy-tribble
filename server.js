const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;
const TOKEN = 'be21195231d946b680453e48456d6e806a34c0456b8c13804aa797cb2c560db1';

// In-memory data structure initialization
let videoVisibility = {};
let mediaData = {};

// Serve static assets
app.use(express.static('public'));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'playlist.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Initialize media fetch and set videoVisibility with default values
const initializeVideos = async () => {
  try {
    const response = await axios.get('https://api.wistia.com/v1/medias.json', {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });

    mediaData = response.data;

    mediaData.forEach((media) => {
      videoVisibility[media.hashed_id] = true;
    });
  } catch (error) {
    console.error('Error initializing videoVisibility:', error);
  }
};

app.get('/api/videos/visibility', (req, res) => {
  res.json({ videoVisibility });
});

app.get('/api/videos', (req, res) => {
  res.json({ mediaData });
});

// Update visibility status per video
app.patch('/api/videos/:hashedId/visibility', (req, res) => {
  const hashedId = req.params.hashedId;
  const visibility = req.body.visibility;

  // In a prod environment we might do some defensive validation here,
  // checking visibility's type and that a corresponding video exists for the hashedId, for example

  videoVisibility[hashedId] = visibility;

  res.json({ success: true });
});

// Fetch video data, then start the server
initializeVideos().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, go get 'em!`);
  });
});
