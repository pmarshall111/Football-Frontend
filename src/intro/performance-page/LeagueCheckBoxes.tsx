import React from 'react';
import FormCheck from "react-bootstrap/cjs/FormCheck";
import "./LeagueCheckBoxes.css"

const LeagueCheckBoxes = (props: any) => {
    const {currLeagues = {}, updateLeagues} = props;
    const leagues = Object.keys(currLeagues);
    const leagueCheckBoxes = leagues
        .sort((a:string, b:string) => a>b ? 1:-1)
        .map(x => {
            const handleClick = ()=>{console.log(x); updateLeagues({...currLeagues, [x]: !currLeagues[x]})};
            // @ts-ignore
            return (
                <div className={"league_check_selector"} onClick={handleClick}>
                    <FormCheck>
                        <FormCheck.Input onClick={handleClick} type={"checkbox"} checked={currLeagues[x]}/>
                        <FormCheck.Label onClick={handleClick}>{convertDbToHuman(x)}</FormCheck.Label>
                    </FormCheck>
                </div>
            )
        });
    return (
        <div>
            <h5>From Leagues:</h5>
            <div className={"league_check_container"}>
                <div className={"league_check_boxes"}>
                    {leagueCheckBoxes}
                </div>
            </div>
        </div>
    );
}

const convertDbToHuman = (leagueName: string) => {
    switch (leagueName) {
        case "LIGUE_1":
            return "Ligue 1";
        case "BUNDESLIGA":
            return "Bundesliga";
        case "RUSSIA":
            return "Russia";
        case "SERIE_A":
            return "Serie A";
        case "LA_LIGA":
            return "La Liga";
        default:
            return leagueName;
    }
}

export default LeagueCheckBoxes;


