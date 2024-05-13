import React, { useState } from 'react';
import Sidebar from 'react-sidebar';
import { NavLink } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";

const SidebarMenu = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Sidebar
            sidebar={<div>Contenido del Menú
                <NavLink to="/">
                    <button >Login</button>
                </NavLink>
            </div>}
            open={isOpen}
            onSetOpen={setIsOpen}
            styles={{ sidebar: { background: 'white', width: '250px' } }}
        >
            <button onClick={() => setIsOpen(true)}><CiMenuBurger /></button>
        </Sidebar>
    );
};

export default SidebarMenu;
