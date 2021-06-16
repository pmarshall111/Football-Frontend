import React from 'react';
import FormCheck from "react-bootstrap/cjs/FormCheck";
import DateSlider from "./DateSlider";

const LeagueCheckBoxes = (props: any) => {
    const {currLeagues = {}, updateLeagues} = props;
    const leagues = Object.keys(currLeagues);
    const leagueCheckBoxes = leagues
        .sort((a:string, b:string) => a>b ? 1:-1)
        .map(x => {
            const handleClick = ()=>{updateLeagues({...currLeagues, [x]: !currLeagues[x]})};
            return (
                <FormCheck>
                    <FormCheck.Input onClick={handleClick} type={"checkbox"} checked={currLeagues[x]}/>
                    <FormCheck.Label onClick={handleClick}>{x}</FormCheck.Label>
                </FormCheck>
            )
        });
    return (
        <div>
            <h5>From Leagues:</h5>
            <div>
                {leagueCheckBoxes}
            </div>
        </div>
    );
}

export default LeagueCheckBoxes;


