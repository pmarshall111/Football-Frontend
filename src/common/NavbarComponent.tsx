import React from 'react';
import Navbar from "react-bootstrap/cjs/Navbar";

import "./NavbarComponent.css"

const NavbarComponent = (props: any) => (
    <Navbar fixed="top" className={"nav"}>
        <div className={"nav-brand"}>
            <Navbar.Brand>BTB</Navbar.Brand>
        </div>
    </Navbar>
);

export default NavbarComponent;
