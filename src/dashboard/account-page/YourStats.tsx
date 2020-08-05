import React from 'react';
import LineChart from "../../intro/performance-page/LineChart";
import PieChart from "../../common/PieChart";
import TeamsMostBetOn from "./TeamsMostBetOn";
import {Betslip} from "../../common/Betslip";

import "./YourStats.css"

const YourStats = (props: any) => (
    <section className={"stats-page"}>
        <h3>Since you joined...</h3>
        <h5 className={"prof-title"}>Profit: 50p</h5>
        <LineChart />
        <h5 className={"total-bets-title"}>Total bets: 30</h5>
        <PieChart />
        <h5>Teams most bet on...</h5>
        <TeamsMostBetOn />
        <h5 className={"most-prof-title"}>Most profitable bet</h5>
        <Betslip date={"123"} teams={["a", "b"]} odds={[1.2, 4.3, 7.7]} betOn={0} result={1} stake={5.5}></Betslip>
    </section>
);

export default YourStats;
