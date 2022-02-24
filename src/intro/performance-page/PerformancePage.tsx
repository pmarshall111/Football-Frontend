import React, {useEffect, useState} from 'react';
import LineChart from "./LineChart";
import BetDisplay from "./BetDisplay";

import "./PerformancePage.css"
import Filters from "./Filters";
import {backendUrl} from "../../config";
import {GameEntity} from "../../entities/GameEntity";
import {CountriesEntity} from "../../entities/CountriesEntity";
import TitleBreak from "../../common/TitleBreak";
import Button from "react-bootstrap/Button";
import {Gear, XLg} from "react-bootstrap-icons";
import {BetTypeEntity} from "../../entities/BetTypeEntity";
import {DateLimitEntity} from "../../entities/DateLimitEntity";

const PerformancePage = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [currDates, setCurrDates] = useState<DateLimitEntity>({startDate: new Date(2019,7,1), endDate: new Date()});
    const [currLeagues, setCurrLeagues] = useState<CountriesEntity>({"EPL": true, "BUNDESLIGA": true, "LA_LIGA": true, "LIGUE_1": true, "RUSSIA": true, "SERIE_A": true});
    const [betTypes, setBetTypes] = useState<BetTypeEntity>({"Back Bet": true, "Lay Bet": true});
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
        const isLayBet = x.bet.layBet;
        let kickOffDate = new Date(kickOff)
        const isGoodDate = kickOffDate >= currDates.startDate && kickOffDate <= currDates.endDate;
        // @ts-ignore
        const isGoodLeague = currLeagues[league];
        const isGoodBetType = isLayBet ? betTypes['Lay Bet'] : betTypes['Back Bet'];
        return isGoodDate && isGoodLeague && isGoodBetType;
    })
    const {series, totalIn, totalOut, totalProfit, betsWon} = calcProfitCreateDataForChart(betsToShow)
    console.log({totalIn, totalOut, totalProfit, betsWon, totalBets: betsToShow.length, betPercWon: 100*betsWon/betsToShow.length})
    const [currMatch, setCurrMatch] = useState({idx: Math.max(0,series.length-1), from: "line"}); //from attribute to stop BetDisplay from scrolling when user hovers
    updateCurrMatchIndexIfOutOfRange(currMatch, setCurrMatch, series);
    let totalMonths = getMonthsBetweenDates(currDates.startDate, currDates.endDate);
    let betsPerMonth = betsToShow.length/totalMonths;
    let percentageProfit = 100*totalIn / totalOut - 100;
    return (
        <div className={"perf-page-container"}>
            <TitleBreak title={"Past Performance"} id={"performance"} subtitle={"Below are all previous bets that were recommended by the AI, along with a graph showing how the profit changed over that period."}>
                <div className={"perf-filter-btn-container top-right-floaty"} onClick={() => setShowFilters(!showFilters)}>
                    <Button className={"perf-filter-btn"} variant={"dark"}>
                        {showFilters ? <XLg /> : <Gear />}
                    </Button>
                </div>
                <div className={`perf-filters ${showFilters ? "show" : ""}`}>
                    <Filters updateDates={(obj: DateLimitEntity) => setCurrDates(obj)}
                             updateLeagues={(obj: CountriesEntity) => setCurrLeagues(obj)}
                             updateBetTypes={(obj: BetTypeEntity) => setBetTypes(obj)}
                             currLeagues={currLeagues}
                             dateExtremes={currDates}
                             betTypes={betTypes}
                    />
                </div>
            </TitleBreak>
            <div className={"perf-info"}>
                <div>
                    <h4>Total profit: £{totalProfit.toFixed(2)} ({percentageProfit > 0 ? "+" : ""}{percentageProfit.toFixed(1)}%)</h4>
                    <div className={"perf-chart"}>
                        <LineChart data={series} currDates={currDates} currMatch={currMatch} updateMatch={(obj:{idx: number, from: string}) => setCurrMatch(obj)} />
                    </div>
                </div>
                <div>
                    <h4>Total Bets: {betsToShow.length} (~{betsPerMonth.toFixed(1)}/month)</h4>
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

const calcProfitCreateDataForChart = (betsToShow: GameEntity[]) => {
    let totalProfit = 0;
    let totalOut = 0;
    let totalIn = 0;
    let betsWon = 0;
    const series = betsToShow.map(x => {
        const {homeScore, awayScore, bet, prediction} = x;
        const {home,draw,away} = prediction.bookieOdds;
        const {stake, resultBetOn, layBet, liability} = bet;
        let winLoss;
        let result = homeScore > awayScore ? 0 : homeScore == awayScore ? 1 : 2;
        let odds = [home,draw,away];
        totalOut += stake;
        if (!layBet) {
            if (result == resultBetOn) {
                betsWon++;
                winLoss = stake*odds[resultBetOn] - stake;
                totalIn += stake*odds[resultBetOn];
            } else {
                winLoss = -stake;
            }
        } else {
            if (result == resultBetOn) {
                winLoss = -liability;
                totalOut += (liability - stake);
            } else {
                betsWon++;
                winLoss = stake;
                totalIn += 2*stake;
            }
        }
        totalProfit += winLoss;
        return {date: new Date(x.kickOff), winLoss };
    });
    return {series, totalProfit, totalIn, totalOut, betsWon};
}

export default PerformancePage;
