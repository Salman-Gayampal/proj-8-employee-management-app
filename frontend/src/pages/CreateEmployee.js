import { useState, useContext } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

import { Form, Button } from 'react-bootstrap';

export default function AddEmployee() {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const [dateHire, setDateHire] = useState('');

    const [isActive, setIsActive] = useState(false);

    function addEmployee(e) {

        e.preventDefault();

        fetch(`${process.env.NORWEGIAN_APP_API_URL}employees/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                position: position,
                dateHire: dateHire
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data) {
                    Swal.fire({
                        title: "Employee succesfully Added",
                        icon: "success",
                        text: `${firstName} ${lastName} is now added`
                    });

                    navigate("/allemployees");
                }
                else {
                    Swal.fire({
                        title: "Oops!",
                        icon: "error",
                        text: `Something went wrong. Please try again!`
                    });
                }

            })

        // Clear input fields
        setFirstName('');
        setLastName('');
        setPosition('');
        setDateHire('');

    }

    return (
        user.isAdmin
            ?
            <>
                <h1 className="my-5 text-center">Create Employee</h1>
                <Form onSubmit={(e) => addEmployee(e)}>

                    <Form.Group controlId="firstName" className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="lastName" className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </Form.Group>



                    <Form.Group controlId="position" className="mb-3">
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Position/Designation"
                            value={position}
                            onChange={e => setPosition(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="dateHire" className="mb-3">
                        <Form.Label>Date Hire</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="MM/DD/YYYY"
                            value={dateHire}
                            onChange={e => setDateHire(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" id="submitBtn">
                        Save
                    </Button>


                    <Button className="m-2" as={Link} to="/allemployees" variant="success" type="submit" id="submitBtn">
                        Cancel
                    </Button>
                </Form>
            </>
            :
            <Navigate to="/" />

    )

}