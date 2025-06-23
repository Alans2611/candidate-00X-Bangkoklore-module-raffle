import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ isLandingPage = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleExploreClick = () => {
    navigate('/feed');
  };
  
  const handleHomeClick = () => {
    navigate('/');
    setIsMenuOpen(false); 
  };
  
  const handleStoriesClick = () => {
    navigate('/feed');
    setIsMenuOpen(false);
  };
  
  const handleSubmitClick = () => {
    navigate('/submit');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderDesktopNavigation = () => {
    if (isLandingPage) {
      return (
        <button 
          className="header__explore-btn"
          onClick={handleExploreClick}
        >
          Explore Trending Stories
        </button>
      );
    }

    switch (location.pathname) {
      case '/feed':
        return (
          <nav className="header__nav header__nav--desktop">
            <button className='header__home-btn' onClick={handleHomeClick}>Home</button>
            <button className='header__submit-btn' onClick={handleSubmitClick}>Submit</button>
          </nav>
        );
      
      case '/submit':
        return (
          <nav className="header__nav header__nav--desktop">
            <button className='header__home-btn' onClick={handleHomeClick}>Home</button>
            <button className='header__stories-btn' onClick={handleStoriesClick}>Stories</button>
          </nav>
        );
      
      default:
        return (
          <nav className="header__nav header__nav--desktop">
            <button className='header__home-btn' onClick={handleHomeClick}>Home</button>
            <button className='header__stories-btn' onClick={handleStoriesClick}>Stories</button>
          </nav>
        );
    }
  };

  const renderMobileNavigation = () => {
    if (isLandingPage) {
      return null; 
    }

    const getMenuItems = () => {
      switch (location.pathname) {
        case '/feed':
          return [
            { label: 'Home', onClick: handleHomeClick },
            { label: 'Submit', onClick: handleSubmitClick }
          ];
        case '/submit':
          return [
            { label: 'Home', onClick: handleHomeClick },
            { label: 'Stories', onClick: handleStoriesClick }
          ];
        default:
          return [
            { label: 'Home', onClick: handleHomeClick },
            { label: 'Stories', onClick: handleStoriesClick }
          ];
      }
    };

    return (
      <>

        <button 
          className={`header__hamburger ${isMenuOpen ? 'header__hamburger--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

 
        <nav className={`header__nav--mobile ${isMenuOpen ? 'header__nav--mobile-open' : ''}`}>
          {getMenuItems().map((item, index) => (
            <button 
              key={index}
              className="header__mobile-btn"
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ))}
        </nav>


        {isMenuOpen && (
          <div 
            className="header__overlay"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </>
    );
  };

  return (
    <header className={`header ${isLandingPage ? 'header--landing' : 'header--feed'}`}>
      <div className="header__container">
        <div className="header__logo" onClick={() => navigate('/')}>
          <h1>BangkokLore</h1>
        </div>
    
        {renderDesktopNavigation()}
    
        {renderMobileNavigation()}
      </div>
    </header>
  );
};

export default Header;
