import React from 'react';
import './RaffleCancel.css';

const RaffleCancel = () => {
  return (
    <div className="raffle-cancel">
      
      <div className="raffle-cancel__container">
        <div className="raffle-cancel__content">
          <div className="raffle-cancel__icon">😔</div>
          
          <h1 className="raffle-cancel__title">Payment Cancelled</h1>
          
          <p className="raffle-cancel__message">
            Your payment was cancelled. No charges have been made to your account.
          </p>
          
          <div className="raffle-cancel__actions">
            <button 
              className="raffle-cancel__btn raffle-cancel__btn--primary"
              onClick={() => window.location.href = '/feed'}
            >
              Try Again
            </button>
            
            <button 
              className="raffle-cancel__btn raffle-cancel__btn--secondary"
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

export default RaffleCancel;
