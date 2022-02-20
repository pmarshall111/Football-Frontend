import React from "react";
import {Betslip} from "../../common/Betslip";

import "./BetDisplay.css";
import {GameEntity} from "../../entities/GameEntity";

const BetDisplay = (props: any) => {
    const {data, currMatch, updateMatch} = props;
    console.log({data})
    const bets = data.map((x:GameEntity, idx:number) => {
        const {homeScore,awayScore, homeTeam, awayTeam} = x;
        const teams = [homeTeam, awayTeam];
        const {bookieOdds, predictions, bookiePredictions} = x.prediction;
        const odds = [bookieOdds.home,bookieOdds.draw,bookieOdds.away]
        const ourPredictions = [predictions.home,predictions.draw,predictions.away]
        const theirPredictions = [bookiePredictions.home,bookiePredictions.draw,bookiePredictions.away]
        const resultBetOn = x.bet ? x.bet.resultBetOn : -1;
        const stake = x.bet ? x.bet.stake : -1;
        const result = homeScore > awayScore ? 0 : homeScore == awayScore ? 1 : 2;
        const highlightedBgColour = x.bet ? (x.bet.layBet ? "#aeff70" : "#ffbf00") : "";
        return (
            <div
                className={"bet-in-scroller"}
                style={{backgroundColor: currMatch.idx == idx ? highlightedBgColour : ""}}
                onMouseEnter={() => updateMatch({idx, from:"bets"})} id={`betslip-${idx}`} key={"slip" + x.homeTeam + x.kickOff + idx}
            >
            <Betslip
                date={new Date(x.kickOff).toDateString()}
                teams={teams}
                odds={odds}
                betOn={resultBetOn}
                result={result}
                stake={stake}
                ourPredictions={ourPredictions}
                bookiePredictions={theirPredictions}
                isLayBet={x.bet.layBet}
                liability={x.bet.liability}
            />
        </div>)});

    const betToShow = document.querySelector(`#betslip-${currMatch.idx}`);
    if (betToShow && currMatch.from != "bets") {
        let y = window.scrollY;
        betToShow.scrollIntoView();
        window.scrollTo(0, y); //resetting y position as scrollIntoView scrolls both the container and also the window
    }
    return (
        <div className={"bet-outer-container"}>
            <div>
                {bets}
            </div>
        </div>
    )
}

export default BetDisplay;
