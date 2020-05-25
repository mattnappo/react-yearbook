import React, { useState } from 'react';
import Cookies from 'universal-cookie';

const Beta = () => {
	const [state, setState] = useState('');
	const cookies = new Cookies();
	
	const handleChange = (event) => { setState({value: event.target.value}); };
	
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(state.value);
		if (state.value == 'testing_the_beta') {
			console.log("Set cookie");
			cookies.set('access', 'testing_the_beta');
			window.location.replace('/');
		}
	};

	return (
		<div>
			Welcome to the beta. Please {`don't`} share this yet please.
			Also, note that {`I'm`} still working on some small fixes and some styling.
			<form onSubmit={handleSubmit}>
				<input type="text" name="password" onChange={handleChange} />
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default Beta;

