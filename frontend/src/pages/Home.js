import { useContext } from 'react';
import { Fragment } from 'react';

import Banner from '../components/Banner';
import UserContext from '../UserContext';

export default function Home() {

	const { user } = useContext(UserContext);

	const activeData = {
		title: `Hi, ${user.username}!`,
		content: "Please choose transactions from menu",
		destination: "/createemployees",
		label: " Add Employees"
	}

	const inactiveData = {
		title: "Hello there!",
		content: "Please sign in to access employee management",
		destination: "/login",
		label: " Sign In Here"
	}

	return (
    
		<Fragment>
            
			{
				(user.id !== null) ?
				<Banner data={activeData}/>
				:
				<Banner data={inactiveData}/>
			}
			
		</Fragment>
	)
};