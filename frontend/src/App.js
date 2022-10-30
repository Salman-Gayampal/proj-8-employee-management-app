import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// COMPONENTS
import Navbar from './components/Navbar';

// PAGES
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import ListEmployee from './pages/ListEmployee';
import CreateEmployee from './pages/CreateEmployee';
import DeletedEmployee from './pages/DeletedEmployee';
import UpdateEmployee from './pages/EditEmployee';
import Error from './pages/Error';


// import logo from './logo.svg';
import './App.css';
import { UserProvider } from './UserContext';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () => {
    localStorage.clear();
  }


  // This side effect is triggered by once the user signs in
  useEffect(() => {

    fetch(`${process.env.NORWEGIAN_APP_API_URL}users/details`, {
      headers: { //get the token from the localstorage to access user details
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {

        if (typeof data._id !== "undefined") {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          })
        } else {

          setUser({
            id: null,
            isAdmin: null
          })

        }
      })

  }, []);


  return (

    <UserProvider value={{ user, setUser, unsetUser }} >
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />

            <Route path="/allemployees" element={<ListEmployee />} />

            <Route path="/createemployees" element={<CreateEmployee />} />
            <Route path="/deletedemployees" element={<DeletedEmployee />} />

            <Route path="/updateemployees/:employeeId" element={<UpdateEmployee />} />
            
            <Route path="*" element={<Error/>} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>

  );
}

export default App;

