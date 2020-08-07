import React from 'react';
import LineChart from "../../intro/performance-page/LineChart";
import PieChart from "../../common/PieChart";
import TeamsMostBetOn from "./TeamsMostBetOn";
import {Betslip} from "../../common/Betslip";

import "./YourStats.css"

const betHistory = [
        {
                date: new Date(2019,7,1),
                teams: ["Liverpool", "Man City"],
                odds: [2.45,3.2,4.7],
                betOn: 0,
                result: 0,
                stake: 5
        },
        {
                date: new Date(2019,8,30),
                teams: ["Southampton", "Leicester"],
                odds: [5.1,4.1,2.2],
                betOn: 0,
                result: 0,
                stake: 15.5
        },
        {
                date: new Date(2019,9,3),
                teams: ["Man United", "Burnley"],
                odds: [1.45,3.8,8.7],
                betOn: 2,
                result: 2,
                stake: 3.5
        },
        {
                date: new Date(2019,10,13),
                teams: ["Anzhi", "CSKA Moscow"],
                odds: [1.45,3.8,8.7],
                betOn: 2,
                result: 2,
                stake: 3.5
        },
        {
                date: new Date(2019,11,22),
                teams: ["Barcelona", "Atletico Madrid"],
                odds: [1.45,3.8,8.7],
                betOn: 2,
                result: 2,
                stake: 3.5
        },
        {
                date: new Date(2020,0,5),
                teams: ["PSG", "OSC Lille"],
                odds: [1.45,3.8,8.7],
                betOn: 2,
                result: 2,
                stake: 3.5
        },
        {
                date: new Date(2020,1,23),
                teams: ["Dortmund", "Hertha Berlin"],
                odds: [1.45,3.8,8.7],
                betOn: 2,
                result: 2,
                stake: 3.5
        },
        {
                date: new Date(2020,2,30),
                teams: ["Juventus", "Inter"],
                odds: [1.45,3.8,8.7],
                betOn: 2,
                result: 2,
                stake: 3.5
        },
        {
                date: new Date(2020,3,17),
                teams: ["Birmingham", "Swansea"],
                odds: [1.45,3.8,8.7],
                betOn: 2,
                result: 2,
                stake: 3.5
        },
        {
                date: new Date(2020,4,20),
                teams: ["Leganes", "Eibar"],
                odds: [1.45,3.8,8.7],
                betOn: 2,
                result: 2,
                stake: 3.5
        }
];
let profit = 0;
const series = betHistory.map(x => {
        const {result, betOn, stake, odds} = x;
        if (result == betOn) {
                profit += stake*odds[betOn];
        } else {
                profit -= stake;
        }
        return {"x": x.date, "y": profit};
});

const YourStats = (props: any) => (
    <section className={"stats-page"}>
        <h3>Since you joined...</h3>
        <h5 className={"prof-title"}>Profit: 50p</h5>
        {/*<LineChart data={series}/>*/}
        <h5 className={"total-bets-title"}>Total bets: 30</h5>
        <PieChart />
        <h5>Teams most bet on...</h5>
        <TeamsMostBetOn />
        <h5 className={"most-prof-title"}>Most profitable bet</h5>
        <Betslip date={"123"} teams={["a", "b"]} odds={[1.2, 4.3, 7.7]} betOn={0} result={1} stake={5.5}></Betslip>
    </section>
);

export default YourStats;
