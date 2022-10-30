import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { RiLoginCircleFill } from 'react-icons/ri';
import { FaUserPlus } from 'react-icons/fa';

export default function Login() {

	const { user, setUser } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isActive, setIsActive] = useState(false);



	function loginUser(e) {


		e.preventDefault();

		fetch(`${process.env.NORWEGIAN_APP_API_URL}users/login`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password

			})
		})
			.then(res => res.json())
			.then(data => {

				console.log(data);
				console.log(data.access);

				if (typeof data.access !== "undefined") {
					localStorage.setItem('token', data.access);
					retrieveUserDetails(data.access)

					Swal.fire({
						title: "Login Successful",
						icon: "success",
						text: "Welcome to Employee Management Portal!"
					})
				} else {

					Swal.fire({
						title: "Authentication Failed",
						icon: "error",
						text: "Please, check your login details and try again."
					})
				}
			})


		setUsername("");
		setPassword("");

		
	}

	const retrieveUserDetails = (token) => {

		fetch(`${process.env.NORWEGIAN_APP_API_URL}users/details`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(data => {

				console.log(data)
				// Global state
				setUser({
					id: data._id,
					username: data.username,
					isAdmin: data.isAdmin
				})
			})

	};


	useEffect(() => {
		if (username !== "" && password !== "") {

			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [username, password])


	return (

		(user.id !== null) ?
			<Navigate to="/" />
			:
			<Form onSubmit={(e) => loginUser(e)} >

				<h1 className="text-center my-3">Login <RiLoginCircleFill /> </h1>

				<Form.Group className="mb-3" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="username"
						value={username}
						onChange={(e) => { setUsername(e.target.value) }}
						placeholder="Enter Your Username" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="password1">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={(e) => { setPassword(e.target.value) }}
						placeholder="Enter Your Password" />
				</Form.Group>
				{isActive ?
					<Button variant="primary" type="submit" id="submitBtn">
						Submit
					</Button>
					:
					<Button variant="danger" type="submit" id="submitBtn" disabled>
						Submit
					</Button>
				}
				<Form.Group className='my-2'>
					<Form.Label>Don't have an account yet?</Form.Label>
				</Form.Group>
				<Button className="Dark" as={Link} to="/register"> 
				<FaUserPlus /> Create Account 
				</Button>

			</Form>
	)
}