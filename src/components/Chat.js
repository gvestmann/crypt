import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

let socket;

function Chat(props) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
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

    setName(name);
    setRoom(room);

    // Passing the object {name: name, room: room} using the es6 syntax
    // Using the callback function in join with the error object
    // Todo if name is taken: reroute to '/' path?
    socket.emit('join', { name, room }, (obj) => {
      // Alert error if error callback
      if(obj !== undefined) {
        alert(obj.error);
        return;
      }
    });

    // This will happen on the component unmount i.e. when the user leaves the chat
    return () => {
      socket.emit('disconnect');
      // Turns the socket instance off
      socket.off();
    }
  }, [ENDPOINT, props.chatData]);

  // Runs at mount and each time messages update
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // Function for sending messages
  function sendMessage(ev) {
    ev.preventDefault();
    const messageSent = `${new Date().getHours()}:${new Date().getMinutes()}`;
    const messageObj = {text: message, timeStamp: messageSent};

    if(message) {
      socket.emit('sendMessage', messageObj, () => setMessage('')); // Last parameter is the callback that is called in the server 'sendMessage' event and once its called message is set to ''
    }
  }

  //console.log(message, messages);
  const msgList = messages.map((msg, index) => <li key={index + msg.user}>{'[' + msg.timeStamp + '] ' + msg.user + ': ' + msg.text}</li>);

  return (
    <>
      <h1>chat</h1>
      <p>Name: {name}, room: {room}</p>
      <input value={message} onChange={(ev) => setMessage(ev.target.value)} onKeyPress={(ev) => ev.key === 'Enter' ? sendMessage(ev) : null} />
      {
        msgList
      }
    </>
  );
}

export default Chat;