import { useContext, useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { FaTrashRestoreAlt } from 'react-icons/fa'
import UserContext from "../UserContext";


import Swal from "sweetalert2";

export default function DeletedEmployee() {

    // to validate the user role.
    const { user } = useContext(UserContext);

    //Create allEmployees State to contain the employees from the database
    const [allEmployees, setAllEmployees] = useState([]);

    const fetchData = () => {
        // Get all inactive employees in the database
        fetch(`${process.env.NORWEGIAN_APP_API_URL}employees/inactive`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setAllEmployees(data.map(employee => {
                    return (
                        <tr key={employee._id}>
                            <td>{employee.firstName} {employee.lastName}</td>
                            <td>{employee.position}</td>
                            <td>{employee.dateHire}</td>
                            <td>{employee.dateDeleted}</td>

                            <td>
                                <Button variant="dark" size="sm" onClick={() => unarchive(employee._id, employee.firstName, employee.lastName)}>
                                    <FaTrashRestoreAlt /> <br></br>
                                    Restore
                                </Button>
                            </td>
                        </tr>
                    )
                }))

            })
    }

    const unarchive = (employeeId, employeeFirstName, employeeLastName) => {
        console.log(employeeId);
        console.log(employeeFirstName + employeeLastName);


        fetch(`${process.env.NORWEGIAN_APP_API_URL}employees/activate/${employeeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                isActive: true
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data) {
                    Swal.fire({
                        title: "Restored Succesfully!",
                        icon: "success",
                        text: `${employeeFirstName} ${employeeLastName} is now active.`
                    })
                    fetchData();
                }
                else {
                    Swal.fire({
                        title: "Restoration Failed!",
                        icon: "error",
                        text: `Something went wrong. Please try again later!`
                    })
                }
            })
    }

    // To fetch all employees in the first render of the page.
    useEffect(() => {
        fetchData();
    }, [])

    return (
        (user.isAdmin)
            ?
            <>
                <div className="mt-5 mb-3 text-center">
                    <h1>List of Deleted Employees</h1>
                    <Button as={Link} to="/allemployees" variant="dark" size="lg" className="mx-2">Back to Employee List</Button>

                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>POSITION</th>
                            <th>DATE HIRE</th>
                            <th>DATE DELETED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allEmployees}
                    </tbody>
                </Table>
            </>
            :
            <Navigate to="/" />
    )
}