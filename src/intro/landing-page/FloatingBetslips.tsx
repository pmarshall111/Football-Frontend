import React from 'react';
import Card from 'react-bootstrap/Card'
import BetslipWithHeader from "./BetslipWithHeader";

import "./FloatingBetslips.css"

const FloatingBetslips = (props:any) => {
    const slips = [
        {
            date: new Date().toDateString(),
            teams: ["Liverpool", "Man City"],
            odds: [2.45,3.2,4.7],
            ourPredictions: [0.45,0.2,0.25],
            bookiePredictions: [0.2,0.3,0.5],
            betOn: 0,
            result: 0,
            stake: 5
        },
        {
            date: new Date().toDateString(),
            teams: ["Southampton", "Leicester"],
            odds: [5.1,4.1,2.2],
            ourPredictions: [0.45,0.2,0.25],
            bookiePredictions: [0.2,0.3,0.5],
            betOn: 0,
            result: 0,
            stake: 15.5
        },
        {
            date: new Date().toDateString(),
            teams: ["Man United", "Burnley"],
            odds: [1.45,3.8,8.7],
            ourPredictions: [0.45,0.2,0.25],
            bookiePredictions: [0.2,0.3,0.5],
            betOn: 2,
            result: 2,
            stake: 3.5
        }
    ];
    let jsxSlips = slips.map((x: any, i:number) => {
        const {date, teams, odds, betOn, result, stake, ourPredictions, bookiePredictions} = x;
        return (
            <div className={"floating-slip floating-slip-"+i}>
                <BetslipWithHeader date={date} teams={teams} odds={odds} betOn={betOn} result={result} stake={stake}
                                   ourPredictions={ourPredictions} bookiePredictions={bookiePredictions} />
            </div>
    )
    });
    return (
        <div className={"floating-container"}>
            {jsxSlips}
        </div>
    );
}

export default FloatingBetslips;
