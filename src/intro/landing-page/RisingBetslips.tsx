import React from 'react';
import Card from 'react-bootstrap/Card'
import BetslipWithHeader from "./BetslipWithHeader";

const RisingBetslips = (props:any) => {
    const slips = [
        {
            date: new Date().toDateString(),
            teams: ["Liverpool", "Man City"],
            odds: [2.45,3.2,4.7],
            betOn: 0,
            result: 0,
            stake: 5
        },
        {
            date: new Date().toDateString(),
            teams: ["Southampton", "Leicester"],
            odds: [5.1,4.1,2.2],
            betOn: 0,
            result: 0,
            stake: 15.5
        },
        {
            date: new Date().toDateString(),
            teams: ["Man United", "Burnley"],
            odds: [1.45,3.8,8.7],
            betOn: 2,
            result: 2,
            stake: 3.5
        }
    ];
    let jsxSlips = slips.map(x => {
        const {date, teams, odds, betOn, result, stake} = x;
        return (
            <BetslipWithHeader date={date} teams={teams} odds={odds} betOn={betOn} result={result} stake={stake} />
        )
    });
    return (
        <div>
            {jsxSlips}
        </div>
    );
}

export default RisingBetslips;
