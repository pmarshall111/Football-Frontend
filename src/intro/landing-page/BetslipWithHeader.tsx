import React from 'react';

import Card from "react-bootstrap/Card";
import {Betslip, BetslipProps} from "../../common/Betslip";

import "./BetslipWithHeader.css"

const BetslipWithHeader = (props: BetslipProps) => {
        const {date, teams, odds, betOn, result, stake} = props;
        return (
            <Card className={"bet-card"}>
                <Card.Header className={"header"}>
                    <h5>New bet</h5>
                    <p>X</p>
                </Card.Header>
                <Betslip date={date} teams={teams} odds={odds} betOn={betOn} result={result} stake={stake} />
            </Card>
        )
};

export default BetslipWithHeader;
