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

  function handleInvalidName(err) {
    setLoggedIn(false);
    alert(err);
  }

  return(
    <div className="chat__wrapper">
      <h2 id="chat__header">CHAT</h2> 
      {!loggedIn &&
        <div className="chat__content">
          <div className="input__wrapper">
            <p className="chat__goggurinn">{">"}</p>
            <input placeholder="Username" type="text" onChange={(ev) => setName(ev.target.value)} onKeyPress={(ev) => ev.key === 'Enter' ? handleLogin(ev) : null}></input>
          </div>
          <button className="chat__button" type="button" onClick={handleLogin}>Login</button>
        </div>
      }
      { loggedIn &&
        <div className="chat__content__reverse">
          <div className="chat__hide-top"></div>
          <Chat chatData={{name: name, room: room}} setLogin={handleInvalidName}/>
        </div>
      }
    </div>
  );
}

export default Join;