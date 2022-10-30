import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { MdLogout } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';
import { RiLoginCircleFill } from 'react-icons/ri';


export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Employees',
        path: '/',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <MdLogout />,
        cName: 'nav-text'
    }
];


export const InactiveSidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <RiLoginCircleFill />,
        cName: 'nav-text'
    },
    {
        title: 'Register',
        path: '/register',
        icon: <FaUserPlus />,
        cName: 'nav-text'
    }


];