app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });
const express = require('express');
const { appendFile } = require('fs');
const PORT = process.env.PORT || 3001;
const ap = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });