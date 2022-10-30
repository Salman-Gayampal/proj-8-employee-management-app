import { Fragment, useState, useEffect, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { FaUserPlus } from 'react-icons/fa';

export default function Register() {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // STATE HOOKS
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isActive, setIsActive] = useState(false);

    function registerUser(e) {

        e.preventDefault();

        fetch(`${process.env.NORWEGIAN_APP_API_URL}users/checkUsername`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username
            })

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    Swal.fire({
                        title: "Duplicate username found",
                        icon: "error",
                        text: "Please provide a different username."
                    })
                } else {
                    fetch(`${process.env.NORWEGIAN_APP_API_URL}users/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            fullName: fullName,
                            username: username,
                            password: password
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);

                            if (data === true) {
                                Swal.fire({
                                    title: 'Registration Successful!',
                                    icon: 'success',
                                    text: 'Welcome to Employee Management Portal!'
                                })

                                // clear input fields
                                setFullName('');
                                setUsername('');
                                setPassword('');

                                navigate('/login')
                            } else {
                                Swal.fire({
                                    title: 'Registration failed',
                                    icon: 'error',
                                    text: 'Something went wrong, try again'
                                })
                            }
                        })
                }
            })
    };

    useEffect(() => {

        if (fullName !== '' && username !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [fullName, username, password]);



    return (
        (user.id !== null) ?
            <Navigate to="/" />
            :
            <Form onSubmit={(e) => registerUser(e)}>

                <h1>Register <FaUserPlus /></h1>

                <Form.Group className="mb-3" controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value) }}
                        placeholder="Full Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                        placeholder="Username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder="Enter Your Password" />
                </Form.Group>

                <Button variant="primary" type="submit" id="submitBtn">
                    Submit
                </Button>

            </Form>




    )
};