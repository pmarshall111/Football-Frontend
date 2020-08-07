import React, {useEffect, useState} from 'react';
import {Link, useRouteMatch, useLocation} from "react-router-dom";

import Navbar from "react-bootstrap/cjs/Navbar";

import "./Sidebar.css"

const Sidebar = (props: any) => {
        const {isExpanded, setExpanded} = props;
        let routeMatch = useRouteMatch();
        let currLocation = useLocation();
        const isAccount = currLocation.pathname.match(/.*(your_info|your_stats|preferences)$/);
        const isYourInfo = currLocation.pathname.match(/.*your_info$/);
        const isYourStats = currLocation.pathname.match(/.*your_stats$/);
        const isPreferences = currLocation.pathname.match(/.*preferences$/);
        const isRecommendations = currLocation.pathname.match(/.*(good_bets|predictions)$/);
        const isGoodBets = currLocation.pathname.match(/.*good_bets$/);
        const isPredictions = currLocation.pathname.match(/.*predictions$/);
        return (
            <Navbar className={`dash-nav ${isExpanded ? "" : "dash-nav-hide"}`}>
                    <Link to={`${routeMatch.url}/your_info`}
                          className={`nav-title ${isAccount ? "nav-selected" : ""}`}>
                        Account
                    </Link>
                    <Link to={`${routeMatch.url}/your_info`}
                          className={`${isYourInfo ? "nav-selected" : ""}`}>
                        Your Info
                    </Link>
                    <Link to={`${routeMatch.url}/your_stats`}
                          className={`${isYourStats ? "nav-selected" : ""}`}>
                        Your Stats
                    </Link>
                    <Link to={`${routeMatch.url}/preferences`}
                        className={`${isPreferences ? "nav-selected" : ""}`}>
                        Preferences
                    </Link>
                    <Link to={`${routeMatch.url}/good_bets`}
                          className={`nav-title ${isRecommendations ? "nav-selected" : ""}`}>
                        Recommendations
                    </Link>
                    <Link to={`${routeMatch.url}/good_bets`}
                          className={`${isGoodBets ? "nav-selected" : ""}`}>
                        Good Bets
                    </Link>
                    <Link to={`${routeMatch.url}/predictions`}
                          className={`${isPredictions ? "nav-selected" : ""}`}>
                        Predictions
                    </Link>
                    <div className={"dash-nav-collapse"} onClick={()=>setExpanded(!isExpanded)} />
            </Navbar>
        );
}

export default Sidebar;
