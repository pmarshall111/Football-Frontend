import React from 'react';
import Navbar from "react-bootstrap/cjs/Navbar";
import Button from "react-bootstrap/Button";

import "./NavbarComponent.css"

const NavbarComponent = (props: any) => (
    <Navbar fixed="top" className={"nav"}>
        <div className={"nav-brand"}>
            <Navbar.Brand href="#home">BTB</Navbar.Brand>
        </div>
        <Button variant={"primary"}>Go to Dashboard</Button>
    </Navbar>
);

export default NavbarComponent;
