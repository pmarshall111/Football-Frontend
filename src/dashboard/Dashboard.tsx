import React from 'react';
import Sidebar from "./sidebar/Sidebar";
import YourStats from "./account-page/YourStats";

import "./Dashboard.css"

const Dashboard = (props: any) => (
    <main className={"dash-container"}>
        <Sidebar/>
        <YourStats />
    </main>
);

export default Dashboard;
