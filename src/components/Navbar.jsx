import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<div className='navbar'>
			<div className='innerNav'>
				<div className='logo'>Techwa Movie APP</div>
				<ul className='menu'>
					<li>
						<Link to='/'>Home</Link>
					</li>

					<li>
						<Link to='/stats'>Stats</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
