import React, {useRef} from "react";
import {Betslip} from "../../common/Betslip";

import "./BetDisplay.css";
import {GameEntity} from "../../entities/GameEntity";

const BetDisplay = (props: any) => {
    const {data, currMatch, updateMatch} = props;
    console.log({data})
    const bets = data.map((x:GameEntity, idx:number) => {
        const teams = [x.homeTeam, x.awayTeam];
        const {home,draw,away} = x.prediction.bookieOdds;
        const odds = [home,draw,away]
        const resultBetOn = x.bet ? x.bet.resultBetOn : -1;
        const stake = x.bet ? x.bet.stake : -1;
        const {homeScore,awayScore} = x;
        const result = homeScore > awayScore ? 0 : homeScore == awayScore ? 1 : 2;
        return (<div onMouseEnter={() => updateMatch({idx, from:"bets"})} id={`betslip-${idx}`}>
            <Betslip date={new Date(x.kickOff).toDateString()} teams={teams} odds={odds} betOn={resultBetOn} result={result} stake={stake} backgroundColour={currMatch.idx == idx ? "green" : ""}  />
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
