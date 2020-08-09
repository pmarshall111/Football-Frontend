import React, {useRef} from "react";
import {Betslip} from "../../common/Betslip";

import "./BetDisplay.css";

const BetDisplay = (props: any) => {
    const {data, currMatch, updateMatch} = props;
    const bets = data.map((x:any, idx:number) =>
        <div onMouseEnter={() => updateMatch({idx, from:"bets"})} id={`betslip-${idx}`}>
            <Betslip date={x.date.toDateString()} teams={x.teams} odds={x.odds} betOn={x.betOn} result={x.result} stake={x.stake} backgroundColour={currMatch.idx == idx ? "green" : ""} />
        </div>);

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
