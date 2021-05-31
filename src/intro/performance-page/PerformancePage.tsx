import React, {useState} from 'react';
import LineChart from "./LineChart";
import BetDisplay from "./BetDisplay";

import "./PerformancePage.css"
import Filters from "./Filters";

const betHistory = [
    {
        date: new Date(2019,7,1),
        teams: ["Liverpool", "Man City"],
        league: "EPL",
        odds: [2.45,3.2,4.7],
        betOn: 0,
        result: 0,
        stake: 5
    },
    {
        date: new Date(2019,8,30),
        teams: ["Southampton", "Leicester"],
        league: "EPL",
        odds: [5.1,4.1,2.2],
        betOn: 0,
        result: 0,
        stake: 15.5
    },
    {
        date: new Date(2019,9,3),
        teams: ["Man United", "Burnley"],
        league: "EPL",
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2019,10,13),
        teams: ["Anzhi", "CSKA Moscow"],
        league: "Russia",
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2019,11,22),
        teams: ["Barcelona", "Atletico Madrid"],
        league: "la Liga",
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2020,0,5),
        teams: ["PSG", "OSC Lille"],
        league: "Ligue 1",
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2020,1,23),
        teams: ["Dortmund", "Hertha Berlin"],
        league: "Bundesliga",
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2020,2,30),
        teams: ["Juventus", "Inter"],
        league: "Serie A",
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2020,3,17),
        teams: ["Birmingham", "Swansea"],
        league: "EPL",
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2020,4,20),
        teams: ["Leganes", "Eibar"],
        league: "La Liga",
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    }
];

const PerformancePage = (props: any) => {
    const [showFilters, setShowFilters] = useState(false);
    const [currDates, setCurrDates] = useState({startDate: betHistory[0].date, endDate: new Date()});
    const [currLeagues, setCurrLeagues] = useState({"EPL": true, "Bundesliga": true, "La Liga": true, "Ligue 1": true, "Russia": true, "Serie A": true});
    const dateExtremes = {startDate: betHistory[0].date, endDate: betHistory[betHistory.length-1].date};

    const betsToShow = betHistory.filter(x => {
        const {date, league} = x;
        const isGoodDate = date >= currDates.startDate && date <= currDates.endDate;
        // @ts-ignore
        const isGoodLeague = currLeagues[league];
        return isGoodDate && isGoodLeague;
    })
    const series = betsToShow.map(x => {
        const {result, betOn, stake, odds} = x;
        let winLoss = 0;
        if (result == betOn) {
            winLoss = stake*odds[betOn];
        } else {
            winLoss = stake;
        }
        return {date: x.date, winLoss };
    });
    const [currMatch, setCurrMatch] = useState({idx: Math.max(0,series.length-1), from: "line"}); //from attribute to stop BetDisplay from scrolling when user hovers
    updateCurrMatchIndexIfOutOfRange(currMatch, setCurrMatch, series);

    return (
        <div>
            <div className={"perf-filter-btn"} onClick={() => setShowFilters(!showFilters)}>
                <h5>Filters</h5>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                    <g fill="#626262"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z"/></g>
                </svg>
            </div>
            <div className={`perf-filters show ${showFilters ? "show" : ""}`}>
                <Filters updateDates={(obj: {startDate: Date, endDate: Date}) => setCurrDates(obj)}
                         updateLeagues={(obj: {"EPL": boolean, "Bundesliga": boolean, "La Liga": boolean, "Ligue 1": boolean, "Russia": boolean, "Serie A": boolean}) => setCurrLeagues(obj)}
                         currLeagues={currLeagues}
                         dateExtremes={dateExtremes}
                />
            </div>
            <div className={"perf-info"}>
                <div>
                    <h5>Profit: £69</h5>
                    <div className={"perf-chart"}>
                        <LineChart data={series} currDates={currDates} currMatch={currMatch} updateMatch={(obj:{idx: number, from: string}) => setCurrMatch(obj)} />
                    </div>
                </div>
                <div>
                    <h5>Total Bets: 60 (1.1/week AVG)</h5>
                    <div className={"perf-chart perf-table"}>
                        <BetDisplay data={betsToShow} currMatch={currMatch} updateMatch={(obj:{idx: number, from: string}) => setCurrMatch(obj)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const updateCurrMatchIndexIfOutOfRange = (currMatch: {idx: number, from: String}, setCurrMatch: Function, series: any[]) => {
    if (currMatch.idx == 0) {
        return; //if idx = 0 it will always be in range
    }
    else if (currMatch.idx > series.length-1) {
        setCurrMatch({idx: series.length-1, from: currMatch.from});
    } else if (currMatch.idx < 0) {
        setCurrMatch({idx:0, from: currMatch.from})
    }
}

export default PerformancePage;
