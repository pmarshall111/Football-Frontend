import React from 'react';
import {Switch, Route, useRouteMatch, useHistory} from "react-router-dom";

import Sidebar from "./sidebar/Sidebar";
import YourStats from "./account-page/YourStats";

import "./Dashboard.css"
import YourInfo from "./account-page/YourInfo";
import Preferences from "./account-page/Preferences";
import GoodBets from "./recommendations-page/GoodBets";

const Dashboard = (props: any) => {
    let routeMatch = useRouteMatch();
    return (
        <main className={"dash-container"}>
            <Sidebar/>
            <Switch>
                <Route path={`${routeMatch.url}/your_info`}>
                    <YourInfo />
                </Route>
                <Route path={`${routeMatch.url}/your_stats`}>
                    <YourStats />
                </Route>
                <Route path={`${routeMatch.url}/preferences`}>
                    <Preferences />
                </Route>
                <Route path={`${routeMatch.url}/good_bets`}>
                    <GoodBets />
                </Route>
            </Switch>
        </main>
    );
}

export default Dashboard;
