let client, channel, username, activeUser;
// const generatePage = () => {
//   return `
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//         <link rel="stylesheet" href="./style.css" />
//         <title>Vanilla PHP and JavaScript Stream Group Chat</title>
//       </head>
//       <body>
//         <div class="main-container">
//           <div class="login" id="login-block">
//             <input
//               type="text"
//               id="user-login-input"
//               placeholder="Enter your username (should be unique)"
//             />
//           </div>
//           <div class="chat-container">
//             <div class="users" id="users"></div>
//             <div class="message-container">
//               <div class="chat-body" id="messages"></div>
//               <div class="message-box">
//                 <input
//                   type="text"
//                   id="message-input"
//                   placeholder="Enter your message..."
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <!-- JavaScipt Stream SDK -->
//         <script src="https://cdn.jsdelivr.net/npm/stream-chat@1.2.2/dist/browser.full-bundle.min.js"></script>
//         <!-- for making http requests -->
//         <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
//         <!-- Our custom JavaScript code -->
//         <script src="./app.js"></script>
//       </body>
//     </html>
//   `;
// };


// Initializing the Javascript SDK

client = new StreamChat('g3cfvczbux98');

//Generate Token
async function generateToken(username) {
  const { token } = (await axios.get(`/token?username=${username}`)).data;
  return token;
};

//setting current user for client SDK
async function initializeClient() {
  const token = await generateToken(username);

  await client.setUser(
    {
      id: username,
      name: 'The user name', // Update this name dynamically
      image: 'https://bit.ly/2u9Vc0r' // user image
    },
    token
  ); // token generated from our Node server

  await listUsers();

  return client;
}


//listening to input
const user = document.getElementById('user-login-input');

user.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    checkAuthState();
  }
});

checkAuthState();

async function checkAuthState() {
  if (!user.value) {
    document.getElementById('login-block').style.display = 'grid';
    document.getElementsByClassName('chat-container')[0].style.display = 'none';
  } else {
    username = user.value;

    await initializeClient();

    document.getElementsByClassName('chat-container')[0].style.display = 'grid';
    document.getElementById('login-block').style.display = 'none';
  };
};

//populate users
function populateUsers(users) {
  // remove the current users from the list of users
  const otherUsers = users.filter(user => user.id !== username);

  const usersElement = document.getElementById('users');
  otherUsers.map(user => {
    const userElement = document.createElement('div');

    userElement.className = 'user';
    userElement.id = user.id;
    userElement.textContent = user.id;
    userElement.onclick = () => selectUserHandler(user);

    usersElement.append(userElement);
  });
}

//user handler
async function selectUserHandler(userPayload) {
  if (activeUser === userPayload.id) return; // current active user, so do not proceed...

  activeUser = userPayload.id;

  // remove the 'active' class from all users
  const allUsers = document.getElementsByClassName('user');
  Array.from(allUsers).forEach(user => {
    user.classList.remove('active');
  });

  // add the 'active' class to the current selected user
  const userElement = document.getElementById(userPayload.id);
  userElement.classList.add('active');

  // remove all previous messages in the message container...
  const messageContainer = document.getElementById('messages');
  messageContainer.innerHTML = '';

  await initializeChannel([username, userPayload.id]);
}

//list users
async function listUsers() {
  const filters = {};
  const response = await client.queryUsers(filters);

  populateUsers(response.users);
  return response;
}

// Initialize channel
async function initializeChannel(members) {
  //members => array of users, [user1, user2]
  channel = client.channel('messaging', {
    members: members,
    session: 8 // custom field, you can add as many as you want
  });

  await channel.watch();
}

// //writing file

// fs.writeFile('index.html', generatePage(), err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });