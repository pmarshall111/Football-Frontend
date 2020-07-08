import React from 'react';
import InfoContainer from "../common/InfoContainer";
import FancyBackground from "../common/FancyBackground";
import RisingBetslips from "./RisingBetslips";
import TitleLayout from "./TitleLayout";

import "./LandingPage.css"

function LandingPage() {
    return (
        <section className={"landing"}>
            <InfoContainer>
                <TitleLayout />
            </InfoContainer>
            <FancyBackground>
                <RisingBetslips></RisingBetslips>
            </FancyBackground>
        </section>
);
}

export default LandingPage
