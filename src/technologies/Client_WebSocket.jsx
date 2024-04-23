import React, { useState, useEffect } from 'react';

const Client = () => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const newWs = new WebSocket('ws://localhost:8080');

    newWs.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });

    newWs.addEventListener('message', (event) => {
      const receivedData = event.data;
    
      if (receivedData instanceof Blob) {
        // Si es un Blob, lee el contenido como texto
        receivedData.text().then((text) => {
          try {
            const parsedMessage = JSON.parse(text);
            setReceivedMessages((prevMessages) => [...prevMessages, parsedMessage]);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        });
      } else if (typeof receivedData === 'string') {
        // Si es una cadena, intenta analizarla directamente
        try {
          const parsedMessage = JSON.parse(receivedData);
          setReceivedMessages((prevMessages) => [...prevMessages, parsedMessage]);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    });    

    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && message.trim() !== '') {
      const messageObject = { sender: 'Anonymous', text: message };
      ws.send(JSON.stringify(messageObject));
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        <h2>Received Messages:</h2>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.sender}:</strong> {msg.text}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Client;
