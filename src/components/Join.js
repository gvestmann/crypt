import React, {useState} from 'react';
import Chat from './Chat';

function Join() {
  const [name, setName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [room] = useState('The Crypt');

  function handleLogin(ev) {
    if(name !== '') {
      setLoggedIn(true);
    }
  }
  // <Link onClick={joinRoom} to={{pathname:'/chat', chatData: {name: name, room: room}}}>
  //           <button className="primaryBtn" type="button" onClick={handleLogin}>Sign in</button>
  //         </Link>

  // In the Link tag we pass the users name and room through the querystring, we can also pass them as props to the chat component?
  return(
    <div className="joinOuterContainer">
      {!loggedIn &&
        <React.Fragment>
          <h1 className="heading">Join</h1>
          <div><input placeholder="Username" className="joinInput" type="text" onChange={(ev) => setName(ev.target.value)}></input></div>
          <button className="primaryBtn" type="button" onClick={handleLogin}>Login</button>
        </React.Fragment>
      }
      {loggedIn &&
        <Chat chatData={{name: name, room: room}}/>
      }
    </div>    
  );
}

export default Join;