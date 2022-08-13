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
  console.log('Dev-messenger app listening on port 8800!');
});

// generating tokens
const serverClient = new StreamChat('5uzparpdtaxp', '7u96k7gdd73pjjyp6p8nmt88ykb59renv6422hk3vus9pbgm854d696j44h93aka');

app.get('/token', (req, res) => {
  const { username } = req.query;
  if (username) {
    const token = serverClient.createToken(username);
    res.status(200).json({ token, status: 'sucess' });
  } else {
    res.status(401).json({ message: 'invalid request', status: 'error' });
  }
});

// //mysql database
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // Your MySQL username,
//       user: 'root',
//       // Your MySQL password
//       password: '',
//       database: 'election'
//     },
//     console.log('Connected to the election database.')
//   );