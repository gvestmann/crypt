import React, {useState, useEffect} from 'react';

function News() {
  const apiBase = 'https://newsapi.org/v2/top-headlines?country=us';
  const apiKey = 'OurKey';

  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const apiUrl = `${apiBase}&apiKey=${apiKey}`;

    fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => setArticles(data.articles));
  }, []);

  const tenNews = articles.slice(0, 10);
  const newsList = tenNews.map((item, index) => {
    return <li key={index}>{item.publishedAt} - <a href={item.url}>{item.title}</a></li>
  });

  return(
    <div>
      <h2>News</h2>
      <ul>
        {
          newsList
        }
      </ul>
    </div>
  );
}

export default News;