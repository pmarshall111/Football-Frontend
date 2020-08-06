import React from 'react';
import Navbar from "react-bootstrap/cjs/Navbar";

import "./Sidebar.css"

const Sidebar = (props: any) => (
    <Navbar className={"dash-nav"}>
        <a className={"nav-title"}>Account</a>
        <a>Your Info</a>
        <a>Your Stats</a>
        <a>Preferences</a>
        <a className={"nav-title"}>Recommendations</a>
        <a>Good Bets</a>
        <a>Predictions</a>
        <div className={"dash-nav-collapse"}></div>
    </Navbar>
);

export default Sidebar;
