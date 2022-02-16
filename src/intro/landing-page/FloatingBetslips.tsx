import React from 'react';
import BetslipWithHeader from "./BetslipWithHeader";

import "./FloatingBetslips.css"

const FloatingBetslips = () => {
    const slips = [
        {
            date: new Date().toDateString(),
            teams: ["Liverpool", "Man City"],
            odds: [2.45,3.2,4.7],
            ourPredictions: [0.45,0.2,0.25],
            bookiePredictions: [0.2,0.3,0.5],
            betOn: 0,
            result: 0,
            stake: 5,
            layBet: false,
            liability: 0
        },
        {
            date: new Date().toDateString(),
            teams: ["Southampton", "Leicester"],
            odds: [5.1,4.1,2.2],
            ourPredictions: [0.35,0.4,0.25],
            bookiePredictions: [0.2,0.3,0.5],
            betOn: 2,
            result: 0,
            stake: 5.5,
            layBet: true,
            liability: 12.10
        },
        {
            date: new Date().toDateString(),
            teams: ["Man United", "Burnley"],
            odds: [1.45,3.8,8.7],
            ourPredictions: [0.45,0.2,0.25],
            bookiePredictions: [0.2,0.3,0.5],
            betOn: 2,
            result: 2,
            stake: 3.5,
            layBet: false,
            liability: 0
        }
    ];
    let jsxSlips = slips.map((x: any, i:number) => {
        const {date, teams, odds, betOn, result, stake, ourPredictions, bookiePredictions, layBet, liability} = x;
        return (
            <div className={"floating-slip floating-slip-"+i} key={"slip-"+i}>
                <BetslipWithHeader
                    date={date}
                    teams={teams}
                    odds={odds}
                    betOn={betOn}
                    result={result}
                    stake={stake}
                    ourPredictions={ourPredictions}
                    bookiePredictions={bookiePredictions}
                    isLayBet={layBet}
                    liability={liability}
                />
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
