import React, { useState } from 'react';
import Cookies from 'universal-cookie';

const Beta = () => {
  const [state, setState] = useState('');
  const cookies = new Cookies();

  const handleChange = (event) => { setState({ value: event.target.value }); };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state.value);
    if (state.value == 'testing_the_beta') {
      console.log('Set cookie');
      cookies.set('access', 'testing_the_beta');
      window.location.replace('/');
    }
  };

  return (
    <div className="beta">
      Welcome to the beta. Please dont share this yet please.<br />
      Enter the beta testing code:
      <form onSubmit={handleSubmit}>
        <input type="text" name="password" onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Beta;
