import React from 'react';
import './StoryCard.css';

const StoryCard = ({ story }) => {
  const handleReadMore = () => {
    console.log('Read more:', story.title);
  };

  return (
    <div className="story-card">
      <div className="story-card__image">
        <img src={story.image} alt={story.title} />
        <div className="story-card__overlay">
          <button className="story-card__read-more" onClick={handleReadMore}>
            Read More
          </button>
        </div>
      </div>
      
      <div className="story-card__content">
        <h3 className="story-card__title">{story.title}</h3>
        <p className="story-card__snippet">{story.snippet}</p>
        <div className="story-card__meta">
          <span className="story-card__author">By {story.author}</span>
          <span className="story-card__date">{story.date}</span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
