import React from 'react';
import FormCheck from "react-bootstrap/cjs/FormCheck";
import DateSlider from "./DateSlider";

const Filters = (props: any) => {
    const leagues = ["EPL", "La Liga", "Ligue 1", "Bundesliga", "Serie A", "Russia"];
    const leagueCheckBoxes = leagues
        .sort((a:string, b:string) => a>b ? 1:-1)
        .map(x => {
        return (
            <FormCheck>
                <FormCheck.Input type={"checkbox"} checked/>
                <FormCheck.Label>{x}</FormCheck.Label>
            </FormCheck>
        )
    });
    return (
        <div>
            <div>
                <h5>Within Dates:</h5>
                <DateSlider />
            </div>
            <div>
                <h5>From Leagues:</h5>
                <div>
                    {leagueCheckBoxes}
                </div>
            </div>
        </div>
    );
}

export default Filters;
