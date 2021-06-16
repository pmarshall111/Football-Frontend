import React, {useEffect, useState} from 'react';
import {Betslip} from "../../common/Betslip";
import TitleBreak from "../../common/TitleBreak";
import LeagueCheckBoxes from "../performance-page/LeagueCheckBoxes";
import PaginationDisplay from "../performance-page/PaginationDisplay";
import {backendUrl} from "../../config";
import {GameEntity} from "../../entities/GameEntity";
import {CountriesEntity} from "../../entities/CountriesEntity";

const PredictionPage = (props: any) => {
    const [currLeagues, setCurrLeagues] = useState<CountriesEntity>({"EPL": true, "BUNDESLIGA": true, "LA_LIGA": true, "LIGUE_1": true, "RUSSIA": true, "SERIE_A": true});
    const [predictions, setPredictions] = useState<GameEntity[]>([]);

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
                let odds = [x.prediction.bookieOdds.home, x.prediction.bookieOdds.draw, x.prediction.bookieOdds.away]
            return <Betslip date={new Date(x.kickOff).toDateString()} teams={[x.homeTeam, x.awayTeam]} odds={odds}  betOn={-1} result={-1} stake={-1}/>
        })
        return (
            <div>
                <LeagueCheckBoxes currLeagues={currLeagues} updateLeagues={setCurrLeagues} />
                <PaginationDisplay itemsToDisplay={goodBets} cols={3} rows={2} />
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
}

export default PredictionPage;