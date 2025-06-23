import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Feed from './pages/Feed/Feed';
import './styles/globals.css';
import Submit from './pages/Submit/Submit';
import RaffleSuccess from './pages/RaffleSuccess/RaffleSuccess';
import RaffleCancel from './pages/RaffleCancel/RaffleCancel';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/feed' element={<Feed/>}/>
          <Route path="/submit" element={<Submit />} />
          <Route path="/raffle-success" element={<RaffleSuccess />} />
          <Route path="/raffle-cancel" element={<RaffleCancel />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
