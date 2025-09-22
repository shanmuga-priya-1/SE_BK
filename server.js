const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to append JSON data to a file
function appendToFile(filename, data) {
  const filePath = path.join(__dirname, filename);

  try {
    let fileData = [];
    if (fs.existsSync(filePath)) {
      const existingData = fs.readFileSync(filePath, 'utf8');
      if (existingData) {
        fileData = JSON.parse(existingData);
      }
    }
    fileData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    console.log(`Data saved to ${filename}`);
  } catch (err) {
    console.error(`Error saving data to ${filename}:`, err);
  }
}

// Contact form endpoint
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill all fields.' });
  }

  const contactData = { name, email, message, date: new Date().toISOString() };
  appendToFile('contacts.json', contactData);

  console.log('New contact saved:', contactData);
  res.json({ status: 'success', message: 'Thank you for contacting us!' });
});

// Review form endpoint
app.post('/review', (req, res) => {
  const { reviewer, reviewText, rating } = req.body;
  if (!reviewer || !reviewText || !rating) {
    return res.status(400).json({ message: 'Please fill all fields.' });
  }

  const reviewData = { reviewer, reviewText, rating, date: new Date().toISOString() };
  appendToFile('reviews.json', reviewData);

  console.log('New review saved:', reviewData);
  res.json({ status: 'success', message: 'Thank you for your review!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
