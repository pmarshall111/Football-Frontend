import React from 'react';
import {Link, useRouteMatch} from "react-router-dom";

import Navbar from "react-bootstrap/cjs/Navbar";

import "./Sidebar.css"

const Sidebar = (props: any) => {
        let routeMatch = useRouteMatch();
        return (
            <Navbar className={"dash-nav"}>
                    <Link to={`${routeMatch.url}/your_info`} className={"nav-title"}>Account</Link>
                    <Link to={`${routeMatch.url}/your_info`}>Your Info</Link>
                    <Link to={`${routeMatch.url}/your_stats`}>Your Stats</Link>
                    <Link to={`${routeMatch.url}/preferences`}>Preferences</Link>
                    <Link to={`${routeMatch.url}/good_bets`} className={"nav-title"}>Recommendations</Link>
                    <Link to={`${routeMatch.url}/good_bets`}>Good Bets</Link>
                    <Link to={`${routeMatch.url}/predictions`}>Predictions</Link>
                    <div className={"dash-nav-collapse"}></div>
            </Navbar>
        );
}

export default Sidebar;
