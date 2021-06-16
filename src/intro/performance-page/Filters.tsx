import React from 'react';
import DateSlider from "./DateSlider";
import LeagueCheckBoxes from "./LeagueCheckBoxes";

const Filters = (props: any) => {
    const {updateLeagues, currLeagues, updateDates, dateExtremes} = props;
    return (
        <div>
            <div>
                <h5>Within Dates:</h5>
                <DateSlider dateExtremes={dateExtremes} updateDates={updateDates} />
            </div>
            <LeagueCheckBoxes currLeagues={currLeagues} updateLeagues={updateLeagues} />
        </div>
    );
}

export default Filters;
