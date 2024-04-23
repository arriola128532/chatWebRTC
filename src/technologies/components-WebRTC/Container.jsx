/* eslint-disable no-unused-vars */
import React from "react";
import Chat from "./Chat";
import { ConnectionConsumer, ChannelConsumer} from "../Client_WebRTC";

const Container = () => {
  return (
    <ConnectionConsumer>
      {({ connection, updateConnection }) => (
        <ChannelConsumer>
          {({ channel, updateChannel }) => (
            <Chat
              connection={connection}
              updateConnection={updateConnection}
              channel={channel}
              updateChannel={updateChannel}
            />
          )}
        </ChannelConsumer>
      )}
    </ConnectionConsumer>
  );
};

export default Container