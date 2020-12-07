import React, {useState, useEffect} from 'react';

const api = 'https://api.coincap.io/v2/assets';

function Currency() {
  const [currencyData, setCurrencyData] = useState([]);


  useEffect(() => {

    fetch(api)
    .then(res => res.json())
    .then((data) => setCurrencyData(data.data));

  }, []);

  const top10Curs = currencyData.slice(0, 10);
  const currencyList = top10Curs.map((item) => {
    return <div key={item.id} className="currency__single--wrapper"><div className="currency__name">{item.id}</div><div>{'$' + parseFloat(item.priceUsd).toFixed(2)}</div><div>{(parseFloat(item.volumeUsd24Hr) / 1000000000).toFixed(3) + 'b'}</div><div>{parseFloat(item.changePercent24Hr).toFixed(2) + '%'}</div></div>
  });
  return (
    <div className="currency__wrapper">
    <h2 id="exchange__header">EXCHANGE</h2>
      <div className="currency__content">
        <div className="currency__hide-top"></div>
        <div className="currencies__info">
          <div className="currency__single--wrapper currency__headers">
            <div></div>
            <div>PRICE</div>
            <div>VOLUME</div>
            <div>CHANGE</div>
          </div>
          {
            currencyList
          }
        </div>
      </div>
    </div>
  );
}

export default Currency;

