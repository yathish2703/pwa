const express = require('express');
const fs = require('fs');

const app = express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  
const port = 3001;



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

// Step 1: Read JSON data from a local file
function readLocalData() {
  try {
    const data = fs.readFileSync('localData.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading  data:', error);
    return null;
  }
}

// Step 2: Define an Express API endpoint to send the data
app.get('/api/data', (req, res) => {
  const localData = readLocalData();

  if (localData) {
    stockData = shuffleArray(localData)
    res.json(stockData);
  } else {
    res.status(500).json({ error: 'Error reading  data' });
  }
});

// Step 3: Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
