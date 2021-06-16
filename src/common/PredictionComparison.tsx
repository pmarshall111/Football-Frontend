import React from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {ArrowDown, ArrowUp} from "react-bootstrap-icons";

const getPredictionColour = (pred: number) => {
    if (pred > 15) return "#a0ff33"
    else if (pred > 10) return '#c4ff80'
    else if (pred > 5) return '#e7ffcc'
    else if (pred > 0) return '#f3ffe6'
    else if (pred > -5) return '#ffe6e6'
    else if (pred > -10) return '#ffcccc'
    else if (pred > -15) return '#ff8080'
    else return '#ff3333'
}

const PredictionComparison = (props: PredComparisonProps) => {
    const {ourPerc, bookiePerc} = props;
    const improvement = ourPerc - bookiePerc;
    const decimals = 0;
    return (
        <OverlayTrigger trigger={["hover", "focus"]} placement={"bottom"} overlay={
            <Tooltip id={`tooltip-${improvement}`}>
                <p>We think this result is <b>{Math.abs(improvement).toFixed(decimals)}% {improvement > 0 ? "MORE" : "LESS"} likely</b> to happen than the bookies.</p>
                <p>Our prediction: {ourPerc.toFixed(decimals)}%</p>
                <p>Bookies prediction: {bookiePerc.toFixed(decimals)}%</p>
            </Tooltip>
        }>
            <div className={"pred_comparison"} style={{backgroundColor: getPredictionColour(improvement)}}>
                {improvement > 0 ? <ArrowUp /> : <ArrowDown />}
                <h5>{improvement.toFixed(decimals)}%</h5>
            </div>
        </OverlayTrigger>
    );
}

export default PredictionComparison;

export type PredComparisonProps = {
    ourPerc: number,
    bookiePerc: number
}
