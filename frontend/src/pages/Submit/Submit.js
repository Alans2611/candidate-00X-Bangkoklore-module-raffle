import React from 'react';
import Header from '../../components/Layout/Header/Header';
import SubmitForm from '../../components/SubmitForm/SubmitForm';

const Submit = () => {
  return (
    <div className="submit">
      <Header isLandingPage={false} />
      <SubmitForm />
    </div>
  );
};

export default Submit;
