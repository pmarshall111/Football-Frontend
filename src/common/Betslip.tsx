import React from 'react';

import Card from 'react-bootstrap/Card'

import "./Betslip.css"
import {Overlay} from "react-bootstrap";
import PredictionComparison from "./PredictionComparison";

export const Betslip = (props: BetslipProps) => {
    const {date, teams, odds, betOn, result, ourPredictions, bookiePredictions, stake, backgroundColour} = props;
    const [homeTeam, awayTeam] = teams;
    const [homeOdds, drawOdds, awayOdds] = odds;
    const toReturn = (stake*odds[betOn]).toFixed(2);
    const stakeStr = stake.toFixed(2);
    const bColour = backgroundColour ? backgroundColour : "transparent";
    const improvements = ourPredictions.map((x,idx) => <PredictionComparison ourPerc={x*100} bookiePerc={bookiePredictions[idx]*100} />);
    const bet = [homeTeam, "draw", awayTeam];
    return (
        <div style={{backgroundColor: bColour}}>
            <Card.Body className={"body"}>
                <h5>{date}</h5>
                <div className={"grid3col"}>
                    <h5>1</h5>
                    <h5>X</h5>
                    <h5>2</h5>
                </div>
                <h5 className={"matchup"}>{homeTeam} vs {awayTeam}</h5>
                <div className={"grid3col"}>
                    <h5>{homeOdds}</h5>
                    <h5>{drawOdds}</h5>
                    <h5>{awayOdds}</h5>
                </div>
                <h5>Our Prediction...</h5>
                <div className={"grid3col"}>
                    {improvements}
                </div>
                {stake > 0 && <div className={"moneyBox"}>
                    <h5>Recommendation! £{stakeStr} on {bet[betOn]}. Returns: £{toReturn}</h5>
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
    backgroundColour? : string
}
