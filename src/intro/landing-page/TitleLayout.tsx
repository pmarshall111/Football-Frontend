import React from 'react';
import Button from "react-bootstrap/Button";

import "./TitleLayout.css"
import {Link} from "react-router-dom";

const TitleLayout = (props: any) => (
    <div className={"title-layout"}>
        <h1>Beating The Bookies</h1>
        <h3>Providing AI recommended bets boasting a 20% profit over the 2019/20 season</h3>
        <div>
            <Link to={"/dashboard/your_info"}>
                <Button variant={"primary"}>Go to Dashboard</Button>
            </Link>
        </div>
    </div>
);

export default TitleLayout;
