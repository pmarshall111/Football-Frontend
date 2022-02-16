import React, {useEffect, useState} from 'react';
import TitleBreak from "../../common/TitleBreak";
import LeagueCheckBoxes from "../../common/LeagueCheckBoxes";
import PaginationDisplay from "./PaginationDisplay";
import {backendUrl} from "../../config";
import {GameEntity} from "../../entities/GameEntity";
import {CountriesEntity} from "../../entities/CountriesEntity";
import SubtitleWithContent from "../../common/SubtitleWithContent";
import BetslipWithHeader from "../landing-page/BetslipWithHeader";
import Button from "react-bootstrap/Button";
import {Gear, XLg} from "react-bootstrap-icons";
import {BetTypeEntity} from "../../entities/BetTypeEntity";
import BetTypeCheckBoxes from "../../common/BetTypeCheckBoxes";

const PredictionPage = () => {
    const [currLeagues, setCurrLeagues] = useState<CountriesEntity>({"EPL": true, "BUNDESLIGA": true, "LA_LIGA": true, "LIGUE_1": true, "RUSSIA": true, "SERIE_A": true});
    const [predictions, setPredictions] = useState<GameEntity[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [betTypes, setBetTypes] = useState<BetTypeEntity>({"Back Bet": true, "Lay Bet": true});
    const [cols, setCols] = useState(getRecommendedColumns(window.innerWidth));

    const subtitle = "Here are the latest recommendations from the AI. " +
        "The 'Bets we Recommend' section highlights all predictions where we think there's a bet worth taking, along with a recommended stake." +
        "The 'All Predictions' section shows all games the AI predicted on and how the prediction compares to the odds offered by the bookies."

    useEffect(() => {
        getPredictions();
    }, [])

    const getPredictions = () => {
        fetch(`${backendUrl}/predictions`).then(r => r.json())
            .then(response => {
                setPredictions(response);
            })
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            console.log("resized to " + window.innerWidth)
            setCols(getRecommendedColumns(window.innerWidth));
        })
    }, [])

    if (predictions.length > 0) {
        // @ts-ignore
        const allPreds = predictions.filter( x => x.league && currLeagues[x.league])
        const bets = allPreds.filter(x => {
            if (!x.bet) return false;
            return x.bet.layBet ? betTypes["Lay Bet"] : betTypes["Back Bet"];
        }).map(x => {
            const {bookieOdds, predictions, bookiePredictions} = x.prediction;
            const {resultBetOn, stake, layBet, liability} = x.bet;
            let bookieOddsArr = [bookieOdds.home, bookieOdds.draw, bookieOdds.away]
            const ourPredictions = [predictions.home,predictions.draw,predictions.away]
            const theirPredictions = [bookiePredictions.home,bookiePredictions.draw,bookiePredictions.away]
            return <BetslipWithHeader
                date={new Date(x.kickOff).toDateString()}
                teams={[x.homeTeam, x.awayTeam]}
                odds={bookieOddsArr}
                betOn={resultBetOn}
                result={-1}
                stake={stake}
                ourPredictions={ourPredictions}
                bookiePredictions={theirPredictions}
                isLayBet={layBet}
                liability={liability}
                key={x.homeTeam + "-" + x.kickOff}
            />
        })


        // @ts-ignore
        const predsToShow = allPreds.map(x => {
                const {bookieOdds, predictions, bookiePredictions} = x.prediction;
                let resultBetOn = -1;
                let stake = -1;
                let layBet = false;
                let liability = 0;
                if (x.bet) {
                    resultBetOn = x.bet.resultBetOn;
                    stake = x.bet.stake;
                    layBet = x.bet.layBet;
                    liability = x.bet.liability;
                }
                let odds = [bookieOdds.home, bookieOdds.draw, bookieOdds.away]
                const ourPredictions = [predictions.home,predictions.draw,predictions.away]
                const theirPredictions = [bookiePredictions.home,bookiePredictions.draw,bookiePredictions.away]
            return <BetslipWithHeader
                date={new Date(x.kickOff).toDateString()}
                teams={[x.homeTeam, x.awayTeam]}
                odds={odds}
                betOn={resultBetOn}
                result={-1}
                stake={stake}
                ourPredictions={ourPredictions}
                bookiePredictions={theirPredictions}
                isLayBet={layBet}
                liability={liability}
                key={x.homeTeam + "," + x.kickOff}
            />
        });

        return (
            <div>
                <TitleBreak title={"Recommendations"} subtitle={subtitle} id={"predictions"}>
                    <div className={"perf-filter-btn-container top-right-floaty"} onClick={() => setShowFilters(!showFilters)}>
                        <Button className={"perf-filter-btn"} variant={"dark"}>
                            {showFilters ? <XLg /> : <Gear />}
                        </Button>
                    </div>
                    <div className={`perf-filters ${showFilters ? "show" : ""}`}>
                        <BetTypeCheckBoxes betTypes={betTypes} updateBetTypes={(obj: BetTypeEntity) => setBetTypes(obj)} />
                        <LeagueCheckBoxes currLeagues={currLeagues} updateLeagues={setCurrLeagues} />
                    </div>
                </TitleBreak>
                <SubtitleWithContent title={"Bets we recommend"}>
                    {bets.length > 0 ?
                        <PaginationDisplay itemsToDisplay={bets} cols={cols} rows={2}/> :
                        <p>No bets worth taking at the moment...</p>
                    }
                </SubtitleWithContent>
                <SubtitleWithContent title={"All predictions"}>
                    <PaginationDisplay itemsToDisplay={predsToShow} cols={cols} rows={2} />
                </SubtitleWithContent>
            </div>
        )
    }

    return (
        <div>
            <TitleBreak title={"Recommendations"} subtitle={subtitle} id={"predictions"} />
            <SubtitleWithContent title={"All predictions"}>
                <p>There are no predictions at the moment.</p>
            </SubtitleWithContent>
        </div>
    )
}

const getRecommendedColumns = (width: Number) => {
    if (width < 850) {
        return 1;
    } else if (width < 1300) {
        return 2;
    } else {
        return 3;
    }
}

export default PredictionPage;