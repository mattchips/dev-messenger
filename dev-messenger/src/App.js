

import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';

const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const client = StreamChat.getInstance('5uzparpdtaxp');

const App = () => {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);

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
    <Chat client={client}>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel channel={ channel }>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;