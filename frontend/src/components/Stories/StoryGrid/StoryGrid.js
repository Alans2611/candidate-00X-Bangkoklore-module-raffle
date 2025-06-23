import React, { useState, useEffect } from "react";
import StoryCard from "../StoryCard/StoryCard";
import AuthorCard from "../AuthorCard/AuthorCard";
import { storyAPI } from "../../../services/api";
import RaffleWidget from "../../RaffleWidget/RaffleWidget";
import './StoryGrid.css';


const formatDate = (dateString) => {
        const now = new Date();
        const storyDate = new Date(dateString);
        const diffTime = Math.abs(now - storyDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 14) return '1 week ago';
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

const transformStoryData = (apiStory) => {
        return {
            id: apiStory.id,
            title: apiStory.title,
            snippet: apiStory.bodytext.substring(0, 150) + '...', 
            author: apiStory.name,
            date: formatDate(apiStory.created_at), 
            image: `../assets/story${apiStory.id}.jpg` 
        };
};

const transformforAuthors = (apiAuthor) => {
    return {
        id: apiAuthor.id,
        name: apiAuthor.name,
        email: apiAuthor.email,
        avatar: `/assets/author.jpg`, 
        storiesCount: Math.floor(Math.random() * 20) + 1,
        followersCount: Math.floor(Math.random() * 5000) + 100, 
        isFollowing: Math.random() > 0.5
    };
};


const StoryGrid = () => {
    const [stories, setStories] = useState([]); 

    useEffect(() => {
        const fetchStories = async () => {
            const apiStories = await storyAPI.getAllStories();
            const transformedStories = apiStories.map(transformStoryData);
            setStories(transformedStories);
        };

        fetchStories();
    }, []); 


    const [featuredAuthors, setAuthors] = useState([]);
    useEffect(() => {
        const fetchAuthors = async () => {
            const apiAuthor = await storyAPI.getAllStories();
            const transformedAuthors = apiAuthor.map(transformforAuthors);
            setAuthors(transformedAuthors);
        };
        fetchAuthors();
    }, []);

    return (
    <div className="maincontent">
      <div className="gridcontent">
        <div className="left-pane">
          <h1>Trending Stories</h1>

          <div className="stories-grid">
            {stories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          <div className="mobile-raffle-section">
            <RaffleWidget />
          </div>

          <div className="mobile-authors-section">
            <h1>Featured Authors</h1>
            <div className="authors-list">
              {featuredAuthors.map(author => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </div>
          </div>
        </div>

        <div className="right-pane">
          <RaffleWidget />
          <h1>Featured Authors</h1>
          <div className="authors-list">
            {featuredAuthors.map(author => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        </div>
      </div>

      

    </div>
    );  
};

export default StoryGrid;
