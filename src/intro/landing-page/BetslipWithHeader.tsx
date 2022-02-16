import React from 'react';

import Card from "react-bootstrap/Card";
import {Betslip, BetslipProps} from "../../common/Betslip";

import "./BetslipWithHeader.css"
import QuestionPopover from "../../common/QuestionPopover";
import {BackBetDefinition, LayBetDefinition} from "../../entities/BetTypeEntity";

const BetslipWithHeader = (props: BetslipProps) => {
        const { betOn, isLayBet } = props;
        let titleText, helpText, backgroundColour;
        if (betOn != -1) {
            if (isLayBet) {
                titleText = "New Lay Bet!"
                helpText = LayBetDefinition;
                backgroundColour = "#aeff70";
            }
            else {
                titleText = "New Back Bet!"
                helpText = BackBetDefinition;
                backgroundColour = "#ffdc73"
            }
        } else {
            titleText = "Prediction"
            backgroundColour = "";
            helpText = "";
        }

        return (
            <Card className={"bet-card"}>
                <Card.Header className={"header"} style={{backgroundColor: backgroundColour}}>
                    <div className={"betslip_title_container"}>
                        <div className={"betslip_title"}>
                            <h5>{titleText}</h5>
                            {betOn != -1 && <QuestionPopover text={helpText} />}
                        </div>
                    </div>
                </Card.Header>
                <Betslip {...props} />
            </Card>
        )
};

export default BetslipWithHeader;
