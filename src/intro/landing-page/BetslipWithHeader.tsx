import React from 'react';

import Card from "react-bootstrap/Card";
import {Betslip, BetslipProps} from "../../common/Betslip";

import "./BetslipWithHeader.css"

const BetslipWithHeader = (props: BetslipProps) => {
        const {date, teams, odds, betOn, result, stake, bookiePredictions, ourPredictions} = props;
        return (
            <Card className={"bet-card"}>
                <Card.Header className={"header"} style={{backgroundColor: betOn != -1 ? "#ffdc73" : ""}}>
                    <h5>{betOn != -1 ? "New bet!" : "Prediction"}</h5>
                </Card.Header>
                <Betslip date={date} teams={teams} odds={odds} betOn={betOn} result={result} stake={stake} bookiePredictions={bookiePredictions} ourPredictions={ourPredictions}/>
            </Card>
        )
};

export default BetslipWithHeader;
