import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

let socket;

function Chat(props) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://react-crypt-chat.herokuapp.com/';

  useEffect(() => {
    const {name, room} = props.chatData;

    socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd'
      }
    });

    socket.emit('join', { name, room }, (obj) => {
      if(obj !== undefined) {
        props.setLogin(obj.error);
      }
    });

    return () => {
    }
  }, [ENDPOINT, props.chatData]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]);
    });
  }, []);

  function sendMessage(ev) {
    ev.preventDefault();
    const messageSent = `${( "0" + (new Date().getHours())).slice(-2)}:${("0" + (new Date().getMinutes())).slice(-2)}`;
    const messageObj = {text: message, timeStamp: messageSent};

    if(message) {
      socket.emit('sendMessage', messageObj, () => setMessage(''));
    }
  }

  const msgList = messages.map((msg, index) => <li key={index + msg.user}><span className="chat__user">{msg.timeStamp + ' [' + msg.user + '] '}</span>{' - ' + msg.text}</li>);

  return (
    <>
      <div className="chat__messages">
        <ul>
          {
            msgList
          }
        </ul>
        <div className="input__wrapper">
          <p className="chat__goggurinn">{">"}</p>
          <input className="chat__input" value={message} onChange={(ev) => setMessage(ev.target.value)} onKeyPress={(ev) => ev.key === 'Enter' ? sendMessage(ev) : null} />
        </div>
      </div>
    </>
  );
}

export default Chat;