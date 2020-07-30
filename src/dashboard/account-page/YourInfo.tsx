import React from 'react';

const YourInfo = (props: any) => {
    let name = "Peter";
    let joined = Date.now();
    return (
        <div>
            <p>Hi {name}!</p>
            <p>Joined {joined}</p>
        </div>
    )
};

export default YourInfo;
