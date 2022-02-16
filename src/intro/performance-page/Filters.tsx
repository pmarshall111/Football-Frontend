import React from 'react';
import DateSlider from "./DateSlider";
import LeagueCheckBoxes from "../../common/LeagueCheckBoxes";
import "./Filters.css"
import BetTypeCheckBoxes from "../../common/BetTypeCheckBoxes";
import {BetTypeEntity} from "../../entities/BetTypeEntity";
import {CountriesEntity} from "../../entities/CountriesEntity";
import {DateLimitEntity} from "../../entities/DateLimitEntity";

const Filters = (props: FiltersProps) => {
    const {updateLeagues, currLeagues, updateDates, dateExtremes, betTypes, updateBetTypes} = props;
    console.log({props})
    return (
        <div className={"filters_container"}>
            <BetTypeCheckBoxes betTypes={betTypes} updateBetTypes={updateBetTypes} />
            <div>
                <h5>Show within these Dates:</h5>
                <DateSlider dateExtremes={dateExtremes} updateDates={updateDates} />
            </div>
            <LeagueCheckBoxes currLeagues={currLeagues} updateLeagues={updateLeagues} />
        </div>
    );
}

export default Filters;

export type FiltersProps = {
    updateLeagues: (countries: CountriesEntity) => void,
    updateDates: (newDates: DateLimitEntity) => void,
    updateBetTypes: (betType: BetTypeEntity) => void
    currLeagues: CountriesEntity,
    dateExtremes: DateLimitEntity,
    betTypes: BetTypeEntity,
}