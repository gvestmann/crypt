import React, {useState, useEffect} from 'react';
import Currency from './components/Currency';
import News from './components/News';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleOnMobile, setVisibleMobile] = useState(<Currency />);

  // Runs when component mounts
  useEffect(() => {
    console.log('In use effect');
    function updateWidth(ev) {
      if(window.innerWidth >= 600) {
        setIsMobile(false);
      } else {
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

  return (
    <div>
      {isMobile ? (
        <div>
          <button>Menu</button>
          <ul>
            <li onClick={() => setVisibleMobile(<News />)}>News</li>
            <li onClick={() => setVisibleMobile(<Currency />)}>Exhange</li>
            <li>Chat</li>
          </ul>
          {
            visibleOnMobile
          }
        </div>
      ) : (
        <div>
          <Currency />
          <News />
        </div>
      )
    }
    </div>
  );
}

export default App;