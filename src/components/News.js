import React, { useEffect, useState, useCallback } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = useCallback(async () => {
    try {
      props.setProgress(0);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a12ebb8e4337492bafad89d1ba4c9ade=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const parsedData = await response.json();
      setArticles(parsedData.articles || []); 
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [page, props]);

  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)}-NewsWizard`
    updateNews();
  }, [updateNews]);

  const fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a12ebb8e4337492bafad89d1ba4c9ade&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    const response = await fetch(url);
    const parsedData = await response.json();
    setArticles(articles.concat(parsedData.articles || [])); // Ensure articles is always an array
    setTotalResults(parsedData.totalResults || 0);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center my-3" style={{margin:'35px 0', marginTop:'90px'}}>
        NewsWizard - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles ? articles.length : 0} // Defensive check for undefined articles
        next={fetchMoreData}
        hasMore={articles.length !== totalResults} // Defensive check for undefined articles
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles && articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    newsUrl={element.url}
                    imageUrl={element.urlToImage}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
