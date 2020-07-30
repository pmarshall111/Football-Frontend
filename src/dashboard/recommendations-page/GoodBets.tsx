import React from 'react';
import {Betslip} from "../../common/Betslip";

const GoodBets = (props: any) => {
    const bets = [{
        date: new Date(2020, 3, 17),
        teams: ["Birmingham", "Swansea"],
        odds: [1.45, 3.8, 8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
        {
            date: new Date(2020, 4, 20),
            teams: ["Leganes", "Eibar"],
            odds: [1.45, 3.8, 8.7],
            betOn: 2,
            result: 2,
            stake: 3.5
        }]
    if (bets.length > 0) {
        const goodBets = bets.map(x => {
            return <Betslip date={x.date.toDateString()} teams={x.teams} odds={x.odds} betOn={x.betOn} result={x.result} stake={x.stake}/>
        })
        return (
            <div>
                <p>Found {goodBets.length} good bets for this week!</p>
                {goodBets}
            </div>
        )
    } else {
        return (
            <div>
                <p>Couldn't find any good bets for this week!</p>
                <p>Sign up for recommendations to be sent to your email in the Account preferences page.</p>
            </div>
        )
    }
};

export default GoodBets;
