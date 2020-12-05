import React, {useState, useEffect} from 'react';

function News() {
  const apiBase = 'https://newsapi.org/v2/top-headlines?country=us';
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
    const formattedDate = `[${dateObj.getDate()}/${dateObj.getMonth() + 1}]`;
    return <div key={index} className="news__single--wrapper"><p className="news__timestamp">{formattedDate}</p><a className="news__headline" href={item.url}>{item.title}</a></div>
  });

  return(
    <div className="news__wrapper">
    <h2>NEWS</h2>
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