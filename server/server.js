const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increased limit for larger files

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

// API endpoint to save theme CSS
app.post('/api/save-theme', (req, res) => {
  const { cssContent } = req.body;
  if (!cssContent) {
    return res.status(400).json({ error: 'CSS content is required' });
  }

  try {
    // Path to the theme.css file
    const themePath = path.join(projectRoot, 'src', 'theme.css');
    
    // Path to the oldThemes directory
    const oldThemesDir = path.join(projectRoot, 'src', 'oldThemes');
    
    // Create oldThemes directory if it doesn't exist
    if (!fs.existsSync(oldThemesDir)) {
      fs.mkdirSync(oldThemesDir, { recursive: true });
    }
    
    // Check if the current theme file exists
    if (fs.existsSync(themePath)) {
      // Generate a backup filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFileName = `theme-backup-${timestamp}.css`;
      const backupPath = path.join(oldThemesDir, backupFileName);
      
      // Read the current theme file and save it to the backup location
      const currentThemeContent = fs.readFileSync(themePath, 'utf8');
      fs.writeFileSync(backupPath, currentThemeContent);
      console.log(`Existing theme backed up to ${backupPath}`);
    }
    
    // Write the new theme CSS content to the theme.css file
    fs.writeFileSync(themePath, cssContent);
    console.log(`New theme saved to ${themePath}`);
    
    res.json({ 
      success: true, 
      message: `Theme saved to ${themePath}` 
    });
  } catch (err) {
    console.error('Error saving theme:', err);
    return res.status(500).json({ 
      error: 'Failed to save theme', 
      details: err.message 
    });
  }
});

// API endpoint to save blog configuration file
app.post('/api/save-blog-config', (req, res) => {
  const { configContent } = req.body;
  
  if (!configContent) {
    return res.status(400).json({ error: 'Configuration content is required' });
  }
  
  try {
    // Path to the BlogConfig.jsx file
    const configPath = path.join(projectRoot, 'src', 'BlogConfig.jsx');
    
    // Create a backup directory if it doesn't exist
    const backupDir = path.join(projectRoot, 'src', 'configBackups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Create a backup of the current config if it exists
    if (fs.existsSync(configPath)) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFileName = `BlogConfig-backup-${timestamp}.jsx`;
      const backupPath = path.join(backupDir, backupFileName);
      
      // Read and save the current config
      const currentConfig = fs.readFileSync(configPath, 'utf8');
      fs.writeFileSync(backupPath, currentConfig);
      console.log(`Current blog config backed up to ${backupPath}`);
    }
    
    // Write the new configuration
    fs.writeFileSync(configPath, configContent);
    console.log(`Blog configuration saved to ${configPath}`);
    
    res.json({
      success: true,
      message: `Blog configuration saved successfully to ${configPath}`
    });
  } catch (err) {
    console.error('Error saving blog config:', err);
    res.status(500).json({
      error: 'Failed to save blog configuration',
      details: err.message
    });
  }
});

// Status endpoint for checking if server is running
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// API endpoint to create image directory
app.post('/api/create-image-directory', (req, res) => {
  const { directoryName } = req.body;
  if (!directoryName) {
    return res.status(400).json({ error: 'Directory name is required' });
  }
  // Path to the images directory
  const imagesDir = path.join(projectRoot, 'public', 'articleImages', directoryName);
  // Create the directory if it doesn't exist
  try {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log(`Image directory created at ${imagesDir}`);
    res.json({ success: true, message: `Image directory created at ${imagesDir}` });
  } catch (err) {
    console.error('Error creating directory:', err);
    return res.status(500).json({ error: 'Failed to create image directory', details: err.message });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`
 ┌────────────────────────────────────────────────┐
 │                                                │
 │ Article Generator Server                       │
 │ Running on port ${PORT}                           │
 │                                                │
 │ API Endpoints:                                 │
 │ - POST /api/save-article                       │
 │ - POST /api/save-theme                         │
 │ - POST /api/create-image-directory             │
 │ - POST /api/save-blog-config                   │
 │ - GET /api/status                              │
 │                                                │
 └────────────────────────────────────────────────┘
 `);
});
