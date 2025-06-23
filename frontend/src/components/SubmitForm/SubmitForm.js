import React, { useState } from 'react';
import { storyAPI } from '../../services/api';
import './SubmitForm.css';

const SubmitForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    bodytext: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await storyAPI.submitStory(formData);
      
      if (response.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          title: '',
          bodytext: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting story:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="submit-form">
      <div className="submit-form__container">
        <h1 className="submit-form__title">Share Your Bangkok Story</h1>
        <p className="submit-form__subtitle">
          Tell us about your unique Bangkok experience and become part of our community
        </p>

        <form onSubmit={handleSubmit} className="submit-form__form">
          <div className="submit-form__field">
            <label htmlFor="name" className="submit-form__label">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="submit-form__input"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="submit-form__field">
            <label htmlFor="email" className="submit-form__label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="submit-form__input"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="submit-form__field">
            <label htmlFor="title" className="submit-form__label">Story Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="submit-form__input"
              placeholder="Give your story a catchy title"
              required
            />
          </div>

          <div className="submit-form__field">
            <label htmlFor="bodytext" className="submit-form__label">Your Story</label>
            <textarea
              id="bodytext"
              name="bodytext"
              value={formData.bodytext}
              onChange={handleChange}
              className="submit-form__textarea"
              placeholder="Share your Bangkok experience in detail..."
              rows="8"
              required
            />
          </div>

          <button
            type="submit"
            className={`submit-form__button ${isSubmitting ? 'submit-form__button--loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Story'}
          </button>

          {submitStatus === 'success' && (
            <div className="submit-form__message submit-form__message--success">
              ✅ Thank you! Your story has been submitted successfully and will appear on the feed.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="submit-form__message submit-form__message--error">
              ❌ Something went wrong. Please try again later.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;
