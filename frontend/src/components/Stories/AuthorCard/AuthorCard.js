import React, { useState } from 'react';
import './AuthorCard.css';

const AuthorCard = ({ author }) => {
  const [isFollowing, setIsFollowing] = useState(author.isFollowing || false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    console.log(`${isFollowing ? 'Unfollowed' : 'Followed'} ${author.name}`);
  };

  return (
    <div className="author-card">
      <div className="author-card__avatar">
        <img src={author.avatar} alt={author.name} />
      </div>
      
      <div className="author-card__info">
        <h4 className="author-card__name">{author.name}</h4>
        <h6 className='author-card__name'>{author.email}</h6>
        <p className="author-card__stats">
          {author.storiesCount} stories • {author.followersCount} followers
        </p>
      </div>
      
      <button 
        className={`author-card__follow-btn ${isFollowing ? 'author-card__follow-btn--following' : ''}`}
        onClick={handleFollowClick}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

export default AuthorCard;
