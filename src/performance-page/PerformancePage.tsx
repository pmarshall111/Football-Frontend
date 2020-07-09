import React from 'react';
import LineChart from "./LineChart";
import DateSlider from "./DateSlider";

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
            <h3>Date slider</h3>
            <DateSlider />
        </div>
    );
}

export default PerformancePage;
