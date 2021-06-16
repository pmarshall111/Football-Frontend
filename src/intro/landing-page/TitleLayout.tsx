import React from 'react';
import Button from "react-bootstrap/Button";

import "./TitleLayout.css"
import {Link} from "react-router-dom";

const TitleLayout = (props: any) => {
    return (
        <div className={"title-layout"}>
            <h1>Beating The Bookies</h1>
            <h3>Providing AI recommended bets boasting a 20% profit over the 2019/20 season</h3>
            <div>
                <Button onClick={() => scrollTo("predictions")} variant={"primary"}>Predictions</Button>
                <Button onClick={() => scrollTo("performance")} variant={"primary"}>Performance</Button>
                <Button onClick={() => scrollTo("faqs")} variant={"primary"}>FAQs</Button>
            </div>
        </div>
    );
}

const scrollTo = (id: string) => {
    let element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({behavior: "smooth"});
    }
}

export default TitleLayout;
