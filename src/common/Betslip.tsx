import React from 'react';

import Card from 'react-bootstrap/Card'

import "./Betslip.css"
import {Overlay} from "react-bootstrap";
import PredictionComparison from "./PredictionComparison";

export const Betslip = (props: BetslipProps) => {
    const {date, teams, odds, betOn, result, ourPredictions=[2.1,3.2,4.5], stake, backgroundColour} = props;
    const [homeTeam, awayTeam] = teams;
    const [homeOdds, drawOdds, awayOdds] = odds;
    const toReturn = (stake*odds[betOn]).toFixed(2);
    const stakeStr = stake.toFixed(2);
    const bColour = backgroundColour ? backgroundColour : "transparent";
    const mapFunc = (val: number) => 100/val
    const bookiePercentages = odds.map(mapFunc);
    const ourPercentages = ourPredictions.map(mapFunc);
    const improvements = ourPercentages.map((x,idx) => <PredictionComparison ourPerc={x} bookiePerc={bookiePercentages[idx]} />);
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
                <h5>Our predictions:</h5>
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
    ourPredictions?: number[],
    backgroundColour? : string
}
