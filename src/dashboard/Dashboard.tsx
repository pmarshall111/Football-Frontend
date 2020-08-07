import React, {useEffect, useState} from 'react';
import {Switch, Route, useRouteMatch} from "react-router-dom";

import Sidebar from "./sidebar/Sidebar";
import YourStats from "./account-page/YourStats";

import "./Dashboard.css"
import YourInfo from "./account-page/YourInfo";
import Preferences from "./account-page/Preferences";
import GoodBets from "./recommendations-page/GoodBets";

const Dashboard = (props: any) => {
    let routeMatch = useRouteMatch();
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    //ensuring sidebar is closed when window is small
    useEffect(() => {
        if (window.innerWidth < 600) {
            setSidebarExpanded(false)
        };
        window.addEventListener("resize", () => {
            if (window.innerWidth < 600) {
                setSidebarExpanded(false)
            };
        })
    })
    return (
        <main className={`dash-container ${sidebarExpanded ? "" : "sidebar-hidden"}`}>
            <Sidebar isExpanded={sidebarExpanded} setExpanded={(val: boolean) => setSidebarExpanded(val)}/>
            <Switch>
                <Route path={`${routeMatch.url}/your_info`}><YourInfo /></Route>
                <Route path={`${routeMatch.url}/your_stats`}><YourStats /></Route>
                <Route path={`${routeMatch.url}/preferences`}><Preferences /></Route>
                <Route path={`${routeMatch.url}/good_bets`}><GoodBets /></Route>
            </Switch>
        </main>
    );
}

export default Dashboard;
