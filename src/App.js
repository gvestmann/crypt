import React, {useState, useEffect} from 'react';
import Currency from './components/Currency';
import News from './components/News';
import Join from './components/Join';
import Menu from './components/Menu';
import './app.css';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [visibleOnMobile, setVisibleMobile] = useState(<News />);

  // Runs when component mounts
  useEffect(() => {
    console.log('In use effect');
    function updateWidth(ev) {
      if(window.innerWidth >= 600 && isMobile) {
        setIsMobile(false);
      } else if(window.innerWidth < 600 && !isMobile) {
        setIsMobile(true);
      }
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => {
      setVisibleMobile(null);
      window.removeEventListener('resize', updateWidth);
    }
  }, []);

  function handleMenuClick(ev) {
    setShowMenu(!showMenu);
  }

  function handleComponentClick(component) {
    setVisibleMobile(component);
    setShowMenu(false);
  }

  return (
    <div>
      {isMobile ? (
        <div>
          <button className="menu__button" onClick={handleMenuClick}>Menu</button>
          {showMenu &&
            <Menu setVisible={handleComponentClick} menuCloser={handleMenuClick}/>
          }
          {
            visibleOnMobile
          }
        </div>
      ) : (
        <div className="desktop__wrapper">
          <div className="news__desktopbox">
            <News />
            </div>
          <div className="currency__desktopbox">
            <Currency />
          </div>
          <div className="join__desktopbox">
            <Join />
          </div>
        </div>
      )
    }
    </div>
  );
}

export default App;