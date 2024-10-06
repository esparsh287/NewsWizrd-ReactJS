import React from 'react';

 const NewsItem=(props)=>  {
  
    let { title, description, imageUrl, newsUrl, author, date } = props;

    return (
      <div className='my-3'>
        <div className="card">
          <img 
            src={!imageUrl ? "https://dims.apnews.com/dims4/default/cce18f8/2147483647/strip/true/crop/4500x2531+0+234/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fea%2Fa2%2F5812c54b200d02058ed98327c122%2F1d6697773b474b138b5558be7d7f001d" : imageUrl} 
            className="card-img-top" 
            alt={title} 
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <span className="badge text-bg-secondary">New</span>
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
