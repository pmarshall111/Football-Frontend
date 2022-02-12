import React from 'react';
import Button from "react-bootstrap/Button";

import "./TitleLayout.css"

const TitleLayout = () => {
    return (
        <div className={"title-layout"}>
            <h1>Beating The Bookies</h1>
            <h3>AI recommended bets, with a model that produced a 60% profit on test data from the start of the 2019/20 season.</h3>
            <div>
                <Button onClick={() => scrollTo("predictions")} variant={"outline-primary"}>Recommendations</Button>
                <Button onClick={() => scrollTo("performance")} variant={"outline-primary"}>Performance</Button>
                <Button onClick={() => scrollTo("faqs")} variant={"outline-primary"}>FAQs</Button>
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
