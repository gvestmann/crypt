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

  return(
    <div className="chat__wrapper">
      <h2>CHAT</h2> 
      <div className="chat__content">
      {!loggedIn &&
        <>
          <div className="input__wrapper">
            <p className="chat__goggurinn">{">"}</p>
            <input placeholder="Username" autoFocus type="text" onChange={(ev) => setName(ev.target.value)} onKeyPress={(ev) => ev.key === 'Enter' ? handleLogin(ev) : null}></input>
          </div>
          <button className="chat__button" type="button" onClick={handleLogin}>Login</button>
        </>
      }
      { loggedIn &&
        <Chat chatData={{name: name, room: room}}/>
      }      
      </div>
    </div>
  );
}

export default Join;