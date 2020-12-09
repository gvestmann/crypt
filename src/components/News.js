import React, {useState, useEffect} from 'react';

function News() {
  const apiBase = 'https://gnews.io/api/v4/search?q=cryptocurrency&token=d72809c66bef97f9480c85489e2edc45&lang=en';
  //const apiKey = 'd72809c66bef97f9480c85489e2edc45';

  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const apiUrl = apiBase;

    fetch(apiUrl)
    .then((res) => {
      if(!res.ok) {
        throw Error(res.statusText + ' - ' + res.url);
      }
      return res.json()
    })
    .then((data) => setArticles(data.articles))
    .catch((error) => console.log('Error: ' + error));
  }, []);

  const tenNews = articles;
  const newsList = tenNews.map((item, index) => {
    const dateString = item.publishedAt;
    const dateObj = new Date(dateString);
    const formattedDate = `[${("0" + dateObj.getDate()).slice(-2)}/${("0" + (dateObj.getMonth() + 1)).slice(-2)}]`;
    return <div key={index} className="news__single--wrapper"><p className="news__timestamp">{formattedDate}</p><a className="news__headline" href={item.url}>{item.title}</a></div>
  });

  return(
    <div className="news__wrapper">
    <h2 id="news__header">NEWS</h2>
      <div className="news__content">
        <div className="news__hide-top"></div>
        <div className="news__news">
          {
            newsList
          }
        </div>
      </div>
    </div>
  );
}

export default News;