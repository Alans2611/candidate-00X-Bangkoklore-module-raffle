import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './RaffleSuccess.css';

const RaffleSuccess = () => {
  const [searchParams] = useSearchParams();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const session_id = searchParams.get('session_id');
    setSessionId(session_id);
  }, [searchParams]);

  return (
    <div className="raffle-success">
      
      <div className="raffle-success__container">
        <div className="raffle-success__content">
          <div className="raffle-success__icon">🎉</div>
          
          <h1 className="raffle-success__title">Payment Successful!</h1>
          
          <p className="raffle-success__message">
            Thank you for purchasing a raffle ticket! Your payment has been processed successfully.
          </p>
          
          <div className="raffle-success__details">
            <p>✅ You have been entered into the raffle</p>
            <p>✅ Your ticket has been added to your account</p>
          </div>

          {sessionId && (
            <div className="raffle-success__session">
              <p><small>Session ID: {sessionId}</small></p>
            </div>
          )}
          
          <div className="raffle-success__actions">
            <button 
              className="raffle-success__btn raffle-success__btn--primary"
              onClick={() => window.location.href = '/feed'}
            >
              Back to Stories
            </button>
            
            <button 
              className="raffle-success__btn raffle-success__btn--secondary"
              onClick={() => window.location.href = '/'}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaffleSuccess;
