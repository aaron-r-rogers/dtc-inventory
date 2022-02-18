import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Hej!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_12">
          <p>
          In business for over 30 years, Danish Teak Classics specializes in finding, restoring and selling vintage Scandinavian modern furniture — that is, furniture and accessories mainly designed and produced during the mid-20th century in Northern Europe and the USA.  We offer high-quality vintage furniture, lighting, ceramics, glass and more, as well as a collection of fine art and new, custom products.
          </p>
        </div>
        </div>
        <br></br>
        <div className="grid-col">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        
      </div>
    </div>
  );
}

export default LandingPage;
