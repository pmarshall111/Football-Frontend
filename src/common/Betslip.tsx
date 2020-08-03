import React from 'react';

import Card from 'react-bootstrap/Card'

import "./Betslip.css"

export type BetslipProps = {
    date: string,
    teams: string[],
    odds: number[],
    betOn: number,
    result: number,
    stake: number
}

export const Betslip = (props: BetslipProps) => {
    const {date, teams, odds, betOn, result, stake} = props;
    const [homeTeam, awayTeam] = teams;
    const [homeOdds, drawOdds, awayOdds] = odds;
    const toReturn = (stake*odds[betOn]).toFixed(2);
    const stakeStr = stake.toFixed(2);
    return (
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
            <div className={"moneyBox"}>
                <h5>Stake: £{stakeStr}</h5>
                <h5>To return: £{toReturn}</h5>
            </div>
        </Card.Body>
    );
}
