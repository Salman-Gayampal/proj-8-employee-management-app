
import React from 'react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData, InactiveSidebarData } from './SidebarData';

import './Navbar.css';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { FaListUl } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';

import NavDropdown from 'react-bootstrap/NavDropdown';
import UserContext from '../UserContext';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const { user } = useContext(UserContext);

  const showSidebar = () => setSidebar(!sidebar);

  const employees = "Employees";

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>

        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' >

            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose onClick={showSidebar}/>
              </Link>
            </li>

            
            {
              (user.id !== null) ?
                <>
                  {
                    SidebarData.map((item, index) => {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path} >
                            {item.icon}
                            {
                              (item.title !== employees) ?
                                <>
                                  <span onClick={showSidebar}>{item.title}</span>
                                </>
                                :
                                <>
                                  <NavDropdown title="Employees" 
                                  id="nav-dropdown">

                                    <NavDropdown.Item  className='dropdownitems' eventKey="4.1" as={Link} to="/allemployees" onClick={showSidebar}> <FaListUl />    List</NavDropdown.Item>
                                  
                                    <NavDropdown.Divider />

                                    <NavDropdown.Item className='dropdownitems' as={Link} to="/createemployees" eventKey="4.4" onClick={showSidebar}>
                                    <FaUserPlus />
                                    
                                    Create</NavDropdown.Item>

                                  </NavDropdown>
                                </>

                            }

                          </Link>
                        </li>
                      );
                    })
                  }

                </>
                :
                <>
                  {
                    InactiveSidebarData.map((item, index) => {
                      return (
                        <li key={index} className={item.cName} onClick={showSidebar}>
                          <Link to={item.path} onClick={showSidebar}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    })
                  }
                </>
            }

          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
