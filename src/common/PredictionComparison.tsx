import React from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

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
                The bookies odds predict a {bookiePerc.toFixed(decimals)}% chance of this result.
                We calculate this result has a {ourPerc.toFixed(decimals)}% chance... {Math.abs(improvement).toFixed(decimals)}% {improvement > 0 ? "more" : "less"} likely to happen than the bookies!
            </Tooltip>
        }>
            <h5 style={{backgroundColor: getPredictionColour(improvement)}}>{ourPerc.toFixed(decimals)}%</h5>
        </OverlayTrigger>
    );
}

export default PredictionComparison;

export type PredComparisonProps = {
    ourPerc: number,
    bookiePerc: number
}
