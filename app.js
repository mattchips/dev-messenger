const fs = require('fs');
const generatePage = () => {
  return `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="./style.css" />
        <title>Vanilla PHP and JavaScript Stream Group Chat</title>
      </head>
      <body>
        <div class="main-container">
          <div class="login" id="login-block">
            <input
              type="text"
              id="user-login-input"
              placeholder="Enter your username (should be unique)"
            />
          </div>
          <div class="chat-container">
            <div class="users" id="users"></div>
            <div class="message-container">
              <div class="chat-body" id="messages"></div>
              <div class="message-box">
                <input
                  type="text"
                  id="message-input"
                  placeholder="Enter your message..."
                />
              </div>
            </div>
          </div>
        </div>
        <!-- JavaScipt Stream SDK -->
        <script src="https://cdn.jsdelivr.net/npm/stream-chat@1.2.2/dist/browser.full-bundle.min.js"></script>
        <!-- for making http requests -->
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <!-- Our custom JavaScript code -->
        <script src="./custom.js"></script>
      </body>
    </html>
  `;
};

//Express server

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.end('Hello World!');
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });

//writing file

fs.writeFile('index.html', generatePage(), err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out index.html to see the output!');
});