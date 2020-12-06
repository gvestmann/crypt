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


    // <div className="join__wrapper">
    // <h2>EXCHANGE</h2>
    //   <div className="currency__content">
    //     <div class="currency__hide-top"></div>
    //     <div className="currencies__info">
    //       <div className="currency__single--wrapper currency__headers">
    //         <div></div>
    //         <div>PRICE</div>
    //         <div>VOLUME</div>
    //         <div>CHANGE</div>
    //       </div>
    //       {
    //         currencyList
    //       }
    //     </div>
    //   </div>
    // </div>  
  );
}

export default Join;