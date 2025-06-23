import React from "react";
import Header from "../../components/Layout/Header/Header";
import StoryGrid from "../../components/Stories/StoryGrid/StoryGrid";
import './Feed.css'
import FloatingRaffle from '../../components/RaffleFloatingWidget/FloatingRaffle';

const Feed = () =>{
    return(
        <div className="feed">
        <Header isLandingPage={false}/>
        <StoryGrid/>

        <div className="hero__seo-placeholder">
      <p><strong>Discover</strong> the unseen charm of Bangkok’s neighborhoods through stories told by real people. Dive into alleyways, art, and aromas that shape the city’s identity.</p>
      <p><strong>BangkokLore</strong> captures the cultural heartbeat of the city. From murals to myths, each contribution builds a living mosaic of creativity and memory.</p>
      </div>
      <FloatingRaffle userId={123} />
        </div>
    );
};

export default Feed;