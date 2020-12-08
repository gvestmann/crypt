import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

let socket;

function Chat(props) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  // Retrieve data that the users entered when joining
  useEffect(() => {
    console.log('Username is: ' + props.chatData.name);
    //const {name, room} = queryString.parse(props.location.search);
    const {name, room} = props.chatData;
    // We can emit different events using this instance of socket
    // Header added for the cors block error....
    socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd'
      }
    });

    // Set the name and room state on connection
    // setName(name);
    // setRoom(room);

    // Passing the object {name: name, room: room} using the es6 syntax
    // Using the callback function in join with the error object
    // Todo if name is taken: reroute to '/' path?
    socket.emit('join', { name, room }, (obj) => {
      // Alert error if error callback
      if(obj !== undefined) {
        //alert(obj.error);
        props.setLogin(obj.error);
      }
    });

    // This will happen on the component unmount i.e. when the user leaves the chat
    return () => {
      // Bann bann að kalla á emit með disconnect skv. documentation?
      // socket.emit('disconnect');
      // Turns the socket instance off
      // socket.disconnect();
    }
  }, [ENDPOINT, props.chatData]);

  // Runs at mount and each time messages update
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]);
    });
    //console.log('MsgsLen: ' + messages.length);
  }, []);

  //console.log('msgs: ' + messages);
  // Function for sending messages
  function sendMessage(ev) {
    ev.preventDefault();
    const messageSent = `${( "0" + (new Date().getHours())).slice(-2)}:${("0" + (new Date().getMinutes())).slice(-2)}`;
    const messageObj = {text: message, timeStamp: messageSent};

    if(message) {
      socket.emit('sendMessage', messageObj, () => setMessage('')); // Last parameter is the callback that is called in the server 'sendMessage' event and once its called message is set to ''
    }
  }

  //console.log(message, messages);
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
          <input className="chat__input" autoFocus value={message} onChange={(ev) => setMessage(ev.target.value)} onKeyPress={(ev) => ev.key === 'Enter' ? sendMessage(ev) : null} />
        </div>
      </div>
    </>
  );
}

export default Chat;