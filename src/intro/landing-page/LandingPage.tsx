import React from 'react';
import InfoContainer from "../../common/InfoContainer";
import FancyBackground from "../../common/FancyBackground";
import FloatingBetslips from "./FloatingBetslips";
import TitleLayout from "./TitleLayout";

import "./LandingPage.css"

function LandingPage() {
    return (
        <section className={"landing"}>
            <InfoContainer>
                <TitleLayout />
            </InfoContainer>
            <FancyBackground>
                <FloatingBetslips></FloatingBetslips>
            </FancyBackground>
        </section>
);
}

export default LandingPage
