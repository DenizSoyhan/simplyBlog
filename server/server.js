const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));  // Increased limit for larger files

// Go one back to get the project root directory 
const projectRoot = path.resolve(__dirname, '..');

// API endpoint to save article file
app.post('/api/save-article', (req, res) => {
  const { fileName, content } = req.body;
  
  if (!fileName || !content) {
    return res.status(400).json({ error: 'File name and content are required' });
  }
  
  // path to our article directory
  const articlesDir = path.join(projectRoot, 'src', 'pages', 'articles');
  
  // Create the directory if it doesn't exist which shouldn't ever be required because the repo has example articles on it already
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }
  
  const filePath = path.join(articlesDir, fileName);
  
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ error: 'Failed to save article', details: err.message });
    }
    
    console.log(`Article saved to ${filePath}`);
    res.json({ success: true, message: `Article saved to ${filePath}` });
  });
});

// Status endpoint for checking if server is running
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`
    ┌────────────────────────────────────────────────┐
    │                                                │
    │   Article Generator Server                     │
    │   Running on port ${PORT}                         │
    │                                                │
    │   API Endpoints:                               │
    │   - POST /api/save-article                     │
    │   - GET  /api/status                           │
    │                                                │
    └────────────────────────────────────────────────┘
  `);
});