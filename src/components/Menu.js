import React from 'react';
import Currency from './Currency';
import News from './News';
import Join from './Join';

function Menu(props) {
  return (
    <div className="menu__overlay">
      <button onClick={() => props.menuCloser()} className="menu__button" id="close__button">Close</button>
      <div className="menu__wrapper">
        <ul className="menu__items">
          <li onClick={() => props.setVisible(<News />)}>- NEWS</li>
          <li onClick={() => props.setVisible(<Currency />)}>- EXCHANGE</li>
          <li onClick={() => props.setVisible(<Join />)}>- CHAT</li>
        </ul>
      </div>
    </div>
  )
}

export default Menu;