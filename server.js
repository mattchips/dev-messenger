// app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello World'
//     });
//   });

// const express = require('express');
// //const { appendFile } = require('fs');
// const PORT = process.env.PORT || 3000;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const app = express();

// Stream Chat server SDK
const StreamChat = require('stream-chat').StreamChat;
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

app.listen(8800, () => {
  console.log('Example app listening on port 8800!');
});

const serverClient = new StreamChat('<STREAM_API_KEY>', '<STREAM_API_SECRET>');

app.get('/token', (req, res) => {
  const { username } = req.query;
  if (username) {
    const token = serverClient.createToken(username);
    res.status(200).json({ token, status: 'sucess' });
  } else {
    res.status(401).json({ message: 'invalid request', status: 'error' });
  }
});