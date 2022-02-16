import React from 'react';

import Card from 'react-bootstrap/Card'

import "./Betslip.css"
import PredictionComparison from "./PredictionComparison";

export const Betslip = (props: BetslipProps) => {
    const {date, teams, odds, betOn, result, ourPredictions, bookiePredictions, stake, backgroundColour, isLayBet, liability} = props;
    const [homeTeam, awayTeam] = teams;
    const [homeOdds, drawOdds, awayOdds] = odds;
    const toReturn = (stake*odds[betOn]).toFixed(2);
    const stakeStr = stake.toFixed(2);
    const liabilityStr = liability.toFixed(2);
    // const bColour = backgroundColour ? backgroundColour : "transparent";
    let bColour = backgroundColour ? backgroundColour : "transparent";
    const improvements = ourPredictions.map((x,idx) => <PredictionComparison ourPerc={x*100} bookiePerc={bookiePredictions[idx]*100} key={"pred" + idx} />);
    const bet = [homeTeam, "draw", awayTeam];
    return (
        <div style={{backgroundColor: bColour}}>
            <Card.Body className={"body"}>
                <h5>{date}</h5>
                <div className={"grid3col"}>
                    <h5 style={{fontWeight: result == 0 ? "bold" : "normal"}}>1</h5>
                    <h5 style={{fontWeight: result == 1 ? "bold" : "normal"}}>X</h5>
                    <h5 style={{fontWeight: result == 2 ? "bold" : "normal"}}>2</h5>
                </div>
                <h5 className={"fixture"}>{homeTeam} vs {awayTeam}</h5>
                <div className={"grid3col"}>
                    <h5>{homeOdds.toFixed(1)}</h5>
                    <h5>{drawOdds.toFixed(1)}</h5>
                    <h5>{awayOdds.toFixed(1)}</h5>
                </div>
                <h5>Our Prediction...</h5>
                <div className={"grid3col"}>
                    {improvements}
                </div>
                {stake > 0 && <div className={"moneyBox"}>
                    {!isLayBet && <h5>Recommendation! £{stakeStr} on {bet[betOn]}. Returns: £{toReturn}</h5>}
                    {isLayBet && <h5>Lay Recommendation! £{stakeStr} on {bet[betOn]}. Returns: £{stakeStr}. Liability: -£{liabilityStr}</h5>}
                </div>}
            </Card.Body>
        </div>
);
}

export type BetslipProps = {
    date: string,
    teams: string[],
    odds: number[],
    betOn: number,
    result: number,
    stake: number,
    bookiePredictions: number[],
    ourPredictions: number[],
    backgroundColour? : string,
    isLayBet: boolean,
    liability: number
}
