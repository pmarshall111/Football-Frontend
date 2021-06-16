import React, {useEffect, useState} from 'react';
import LineChart from "./LineChart";
import BetDisplay from "./BetDisplay";

import "./PerformancePage.css"
import Filters from "./Filters";
import {backendUrl} from "../../config";
import {GameEntity} from "../../entities/GameEntity";
import {CountriesEntity} from "../../entities/CountriesEntity";

const PerformancePage = (props: any) => {
    const [showFilters, setShowFilters] = useState(false);
    const [currDates, setCurrDates] = useState({startDate: new Date(2019,7,1), endDate: new Date()});
    const [currLeagues, setCurrLeagues] = useState<CountriesEntity>({"EPL": true, "BUNDESLIGA": true, "LA_LIGA": true, "LIGUE_1": true, "RUSSIA": true, "SERIE_A": true});
    const [historicBets, setHistoricBets] = useState<GameEntity[]>([]);

    useEffect(() => {
        getHistoricBets();
    }, [])

    const getHistoricBets = () => {
        fetch(`${backendUrl}/bets`).then(r => r.json())
            .then(response => {
                console.log({response})
                setHistoricBets(response);
            })
    }

    const betsToShow = historicBets.filter(x => {
        const {kickOff, league} = x;
        let kickOffDate = new Date(kickOff)
        const isGoodDate = kickOffDate >= currDates.startDate && kickOffDate <= currDates.endDate;
        // @ts-ignore
        const isGoodLeague = currLeagues[league];
        return isGoodDate && isGoodLeague;
    })
    let totalProfit = 0;
    const series = betsToShow.map(x => {
        const {homeScore, awayScore, bet, prediction} = x;
        const {home,draw,away} = prediction.bookieOdds;
        const {stake, resultBetOn} = bet;
        let winLoss = 0;
        let result = homeScore > awayScore ? 0 : homeScore == awayScore ? 1 : 2;
        let odds = [home,draw,away];
        if (result == resultBetOn) {
            winLoss = stake*odds[resultBetOn];
        } else {
            winLoss = -stake;
        }
        totalProfit += winLoss;
        return {date: new Date(x.kickOff), winLoss };
    });
    const [currMatch, setCurrMatch] = useState({idx: Math.max(0,series.length-1), from: "line"}); //from attribute to stop BetDisplay from scrolling when user hovers
    updateCurrMatchIndexIfOutOfRange(currMatch, setCurrMatch, series);
    let totalMonths = getMonthsBetweenDates(currDates.startDate, currDates.endDate);
    let betsPerMonth = betsToShow.length/totalMonths;

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
                         updateLeagues={(obj: CountriesEntity) => setCurrLeagues(obj)}
                         currLeagues={currLeagues}
                         dateExtremes={currDates}
                />
            </div>
            <div className={"perf-info"}>
                <div>
                    <h5>Profit: £{totalProfit}</h5>
                    <div className={"perf-chart"}>
                        <LineChart data={series} currDates={currDates} currMatch={currMatch} updateMatch={(obj:{idx: number, from: string}) => setCurrMatch(obj)} />
                    </div>
                </div>
                <div>
                    <h5>Number of Bets Recommended: {betsToShow.length} (~{betsPerMonth.toFixed(1)}/month)</h5>
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

const getMonthsBetweenDates = (startDate: Date, endDate: Date) => {
    let monthsYears = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    let months = endDate.getMonth() - startDate.getMonth();
    return Math.max(1,monthsYears+months);
}

export default PerformancePage;
