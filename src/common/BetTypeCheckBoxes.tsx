import React from 'react';
import FormCheck from "react-bootstrap/cjs/FormCheck";
import {BetTypeEntity, BetTypeText} from "../entities/BetTypeEntity";

import "./BetTypeCheckBoxes.css"
import QuestionPopover from "./QuestionPopover";

const BetTypeCheckBoxes = (props: BetTypeCheckBoxesProps) => {
    const {betTypes, updateBetTypes} = props;
    const betTypesList = Object.keys(betTypes);
    const betTypesCheckBoxes = betTypesList
        .map(x => {
            const handleClick = () => {
                console.log(x);
                // @ts-ignore
                updateBetTypes({...betTypes, [x]: !betTypes[x]})
            };
            // @ts-ignore
            let isChecked = betTypes[x];
            return (
                <div className={"league_check_selector"} onClick={handleClick} key={x}>
                    <FormCheck>
                        <FormCheck.Input onClick={handleClick} type={"checkbox"} checked={isChecked}/>
                        <FormCheck.Label onClick={handleClick}>{x}</FormCheck.Label>
                    </FormCheck>
                </div>
            )
        });
    return (
        <div>
            <div className={"betType_title_container"}>
                <div className={"betType_title"}>
                    <h5>Show bets of these types:</h5>
                    <QuestionPopover text={BetTypeText} />
                </div>
            </div>
            <div className={"betType_check_container"}>
                <div className={"betType_check_boxes"}>
                    {betTypesCheckBoxes}
                </div>
            </div>
        </div>
    );
};

export default BetTypeCheckBoxes;

export type BetTypeCheckBoxesProps = {
    betTypes: BetTypeEntity,
    updateBetTypes: (betType: BetTypeEntity) => void
}
