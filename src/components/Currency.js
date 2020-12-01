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
    return <tr key={item.id}><td>{item.id}</td><td>{item.volumeUsd24Hr}</td><td>{parseFloat(item.priceUsd).toFixed(2)}</td><td>{parseFloat(item.changePercent24Hr).toFixed(2)}</td></tr>
  });
  return (

    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {
            currencyList
          }
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default Currency;