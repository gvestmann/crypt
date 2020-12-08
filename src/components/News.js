import React, {useState, useEffect} from 'react';

function News() {
  const apiBase = 'http://newsapi.org/v2/everything?q=cryptocurrency&sortBy=popularity&sortBy=publishedAt';
  const apiKey = 'e39c74dae24a4baa9a6db4d780671c3d';

  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const apiUrl = `${apiBase}&apiKey=${apiKey}`;

    fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => setArticles(data.articles));
  }, []);

  const tenNews = articles.slice(0, 10);
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