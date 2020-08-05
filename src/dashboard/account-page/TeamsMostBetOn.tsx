import React from 'react';
import Team from "./Team";

const TeamsMostBetOn = (props: any) => {
    const teams = [{
        team: "Liverpool",
        count: 4
    }, {
        team: "Oldham Athletic",
        count: 2
    }, {
        team: "Accrington Stanley",
        count: 2
    }, {
        team: "Barcelona",
        count: 2
    }];
    const teamsToDisplay = teams
        .sort((a: any, b: any) => {
        if (a.count > b.count) return -1;
        else if (a.count < b.count) return 1;
        else return a.team < b.team ? -1:1;})
        .slice(0, 3)
        .map(x => <Team teamName={x.team} count={x.count} />);
    return (
        <div>
            {teamsToDisplay}
        </div>
    );
}

export default TeamsMostBetOn;
