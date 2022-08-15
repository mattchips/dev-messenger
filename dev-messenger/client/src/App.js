

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

const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const client = StreamChat.getInstance('5uzparpdtaxp');

const App = () => {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);

  const authToken = false;

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: 'adrian-szeto',
            name: 'Adrian Szeto',
          },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRyaWFuLXN6ZXRvIn0.A0_DElZ0BhkEXtYFcgYLfkissxJkExz2VUGvPTni8CA',
        );
        const channel = await client.channel('messaging', 'messaging-demo', {
          name: 'Messaging Demo',
        })
        setChannel(channel);

        setClientReady(true);
      } catch (err) {
        console.log(err);
      }
    };

    setupClient();
  }, []);

  if (!clientReady) return null;

  return (
    <>
      {!authToken && <Auth/>}
      {authToken && <Chat client={client} darkMode={true}>
        <Channel channel={ channel }>
          <Video/>
          <MessagingContainer></MessagingContainer>
        </Channel>
      </Chat>}
    </>
  );
};

export default App;