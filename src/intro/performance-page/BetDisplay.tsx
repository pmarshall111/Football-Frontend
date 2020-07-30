import React from "react";
import {Betslip} from "../../common/Betslip";

import "./BetDisplay.css";

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

const BetDisplay = (props: any) => {
    const bets = betHistory.map(x => <Betslip date={x.date.toDateString()} teams={x.teams} odds={x.odds} betOn={x.betOn} result={x.result} stake={x.stake} />);
    return (
        <div className={"bet-outer-container"}>
            <div>
                {bets}
            </div>
        </div>
    )
}

export default BetDisplay;
