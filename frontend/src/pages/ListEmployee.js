import { useContext, useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEdit } from 'react-icons/ai'
import UserContext from "../UserContext";


import Swal from "sweetalert2";

export default function ListEmployee() {

    // to validate the user role.
    const { user } = useContext(UserContext);

    //Create allEmployees State to contain the employees from the database.
    const [allEmployees, setAllEmployees] = useState([]);

    //"fetchData()" wherein we can invoke if their is a certain change with the product.
    const fetchData = () => {
        // Get all Employees in the database
        fetch(`${process.env.NORWEGIAN_APP_API_URL}employees/`, {
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

                            <td>
                                {
                                    <>
                                        <Button variant="dark" size="sm" onClick={() => archive(employee._id, employee.firstName, employee.lastName)}>
                                            <FaTrashAlt /> <br></br>
                                            Delete
                                        </Button>

                                        <Button as={Link} to={`/updateemployees/${employee._id}`} variant="dark" size="sm" className="m-2" >
                                            <AiOutlineEdit /> <br></br>
                                            Edit</Button>
                                    </>
                                }
                            </td>
                        </tr>
                    )
                }))

            })
    }

    const archive = (employeeId, employeeFirstName, employeeLastName) => {
        console.log(employeeId);
        console.log(employeeFirstName + employeeLastName);

        fetch(`${process.env.NORWEGIAN_APP_API_URL}employees/${employeeId}/archive`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data) {
                    Swal.fire({
                        title: "Delete Succesful!",
                        icon: "success",
                        text: `${employeeFirstName} ${employeeLastName} is now deleted.`
                    })
                    fetchData();
                }
                else {
                    Swal.fire({
                        title: "Delete Unsuccessful!",
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
                    <h1>List of Employees</h1>

                    <Button as={Link} to="/createemployees" variant="primary" size="lg" className="mx-2">Create Employee</Button>

                    <Button as={Link} to="/deletedemployees" variant="primary" size="lg" className="mx-2">Deleted Employees</Button>

                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>POSITION</th>
                            <th>DATE HIRE</th>
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