import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';

const Client = () => {
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState('');
  const [peerIdToConnect, setPeerIdToConnect] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    const initializePeer = async () => {
      const newPeer = new Peer();
      newPeer.on('open', (id) => {
        setPeer(newPeer);
        setPeerId(id);
      });

      newPeer.on('connection', (conn) => {
        conn.on('data', (data) => {
          setReceivedMessage(data);
        });
      });
    };

    initializePeer();

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  const connectToPeer = () => {
    const conn = peer.connect(peerIdToConnect);
    conn.on('open', () => {
      console.log('Connected to peer:', peerIdToConnect);
    });
  };

  const sendMessage = () => {
    const conn = peer.connections[peerIdToConnect][0];
    if (conn) {
      conn.send(message);
    }
  };

  return (
    <div>
      <h1>WebRTC Chat with Peer.js</h1>
      <p>Your Peer ID: {peerId}</p>
      <input
        type="text"
        placeholder="Enter Peer ID to connect"
        value={peerIdToConnect}
        onChange={(e) => setPeerIdToConnect(e.target.value)}
      />
      <button onClick={connectToPeer}>Connect</button>
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <p>Received Message: {receivedMessage}</p>
      </div>
    </div>
  );
};

export default Client;
