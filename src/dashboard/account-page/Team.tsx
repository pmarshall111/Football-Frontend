import React from 'react';

import "./Team.css"

const Team = (props: any) => {
    const {teamName,count} = props;
    return (
        <div className={"team"}>
            <h5>{teamName}</h5>
            <h5>{count}</h5>
        </div>
    );
}

export default Team;
