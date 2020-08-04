import React from 'react';
import LineChart from "./LineChart";
import DateSlider from "./DateSlider";
import BetDisplay from "./BetDisplay";

const PerformancePage = (props: any) => {
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
        return {"x": x.date.toString(), "y": profit};
    });
    return (
        <div>
            <div>
                <h5>Filters</h5>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                    <g fill="#626262"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z"/></g>
                </svg>
            </div>
            <div style={{"width": "50%", "height": "50vh"}}>
                <BetDisplay />
            </div>
        </div>
    );
}

export default PerformancePage;
