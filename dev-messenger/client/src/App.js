
import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
} from 'stream-chat-react';
import Auth from './components/Auth';
import MessagingContainer from './components/MessagingContainer';
import Video from './components/Video';
import '@stream-io/stream-chat-css/dist/css/index.css';
import { useCookies} from 'react-cookie'

const client = StreamChat.getInstance(process.env.API_KEY);

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [channel, setChannel] = useState(null);
  const [users, setUsers] = useState(null);

  const authToken = cookies.AuthToken

  console.log(authToken)

  useEffect(() => {
    async function fetchData() {
      if (authToken) {
          const { users} = await client.queryUsers({ role: 'user'})
          setUsers(users)
      }
    }
    fetchData()
  }, [])

  const setupClient = async () => {
    try {
      await client.connectUser(
        {
          id: cookies.UserId,
          name: cookies.Name,
          hashedPassword: cookies.HashedPassword,
        },
        authToken
      );
      const channel = await client.channel('messaging', 'messaging-demo', {
        name: 'Messaging Demo',
      })
      setChannel(channel);
    } catch (err) {
      console.log(err);
    }
  };

  if (authToken) setupClient();

  return (
    <>
      {!authToken && <Auth/>}
      {authToken && <Chat client={client} darkMode={true}>
        <Channel channel={ channel }>
          <Video/>
          <MessagingContainer users={users}/>
        </Channel>
      </Chat>}
    </>
  );
};

export default App;