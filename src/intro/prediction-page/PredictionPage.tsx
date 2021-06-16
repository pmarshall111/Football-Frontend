import React, {useEffect, useState} from 'react';
import {Betslip} from "../../common/Betslip";
import TitleBreak from "../../common/TitleBreak";
import LeagueCheckBoxes from "../performance-page/LeagueCheckBoxes";
import PaginationDisplay from "../performance-page/PaginationDisplay";
import {backendUrl} from "../../config";
import {GameEntity} from "../../entities/GameEntity";
import {CountriesEntity} from "../../entities/CountriesEntity";
import Filters from "../performance-page/Filters";

const PredictionPage = (props: any) => {
    const [currLeagues, setCurrLeagues] = useState<CountriesEntity>({"EPL": true, "BUNDESLIGA": true, "LA_LIGA": true, "LIGUE_1": true, "RUSSIA": true, "SERIE_A": true});
    const [predictions, setPredictions] = useState<GameEntity[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        getPredictions();
    }, [])

    const getPredictions = () => {
        fetch(`${backendUrl}/predictions`).then(r => r.json())
            .then(response => {
                setPredictions(response);
            })
    }

    if (predictions.length > 0) {
        // @ts-ignore
        const goodBets = predictions.filter( x => x.league && currLeagues[x.league])
            .map(x => {
                const {bookieOdds, predictions, bookiePredictions} = x.prediction;
                let odds = [bookieOdds.home, bookieOdds.draw, bookieOdds.away]
                const ourPredictions = [predictions.home,predictions.draw,predictions.away]
                const theirPredictions = [bookiePredictions.home,bookiePredictions.draw,bookiePredictions.away]
            return <Betslip date={new Date(x.kickOff).toDateString()} teams={[x.homeTeam, x.awayTeam]} odds={odds}  betOn={-1} result={-1} stake={-1}
                            ourPredictions={ourPredictions} bookiePredictions={theirPredictions}/>
        })
        return (
            <div>
                <div className={"perf-filter-btn-container"} onClick={() => setShowFilters(!showFilters)}>
                    <div className={"perf-filter-btn"}>
                        <h5>Filters</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                            <g fill="#626262"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z"/></g>
                        </svg>
                    </div>
                </div>
                <div className={`perf-filters ${showFilters ? "show" : ""}`}>
                    <LeagueCheckBoxes currLeagues={currLeagues} updateLeagues={setCurrLeagues} />
                </div>
                <PaginationDisplay itemsToDisplay={goodBets} cols={3} rows={2} />
            </div>
        )
    }

    return (
        <div>
            <p>Couldn't find any good bets for this week!</p>
            <p>Sign up for recommendations to be sent to your email in the Account preferences page.</p>
        </div>
    )
}

export default PredictionPage;