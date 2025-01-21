const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;  


app.use((req, res, next) => {
  const logDetails = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    url: req.originalUrl,
    method: req.method,
    protocol: req.protocol,
    hostname: req.hostname,
  };

  
  logToFile(logDetails);

  next();  
});


function logToFile(logDetails) {
  const logMessage = JSON.stringify(logDetails) + '\n';  
  const logFilePath = path.join(__dirname, 'requests.log');  


  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
