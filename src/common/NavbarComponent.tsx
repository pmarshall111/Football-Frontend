import React from 'react';
import Navbar from "react-bootstrap/cjs/Navbar";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

import "./NavbarComponent.css"

const NavbarComponent = (props: any) => (
    <Navbar fixed="top" className={"nav"}>
        <div className={"nav-brand"}>
            <Link to={"/"}>
                <Navbar.Brand>BTB</Navbar.Brand>
            </Link>
        </div>
        <Link to={"/dashboard/your_info"}>
            <Button variant={"primary"}>Go to Dashboard</Button>
        </Link>
    </Navbar>
);

export default NavbarComponent;
