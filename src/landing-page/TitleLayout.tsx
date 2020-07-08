import React from 'react';
import Button from "react-bootstrap/Button";

import "./TitleLayout.css"

const TitleLayout = (props: any) => (
    <div className={"title-layout"}>
        <h1>Beating The Bookies</h1>
        <h3>Providing AI recommended bets boasting a 20% profit over the 2019/20 season</h3>
        <div>
            <Button variant={"primary"}>Go to Dashboard</Button>
        </div>
    </div>
);

export default TitleLayout;
