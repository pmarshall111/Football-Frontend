import React, {useEffect, useState} from 'react';
import LandingPage from "./landing-page/LandingPage";
import PerformancePage from "./performance-page/PerformancePage";
import FaqPage from "./faq-page/FaqPage";
import TitleBreak from "../common/TitleBreak";
import PredictionPage from "./prediction-page/PredictionPage";
import {backendUrl} from "../config";

const Intro = (props: any) => {
        return (
            <main>
                    <LandingPage />
                    <TitleBreak title={"Predictions"} id={"predictions"} />
                    <PredictionPage />
                    <TitleBreak title={"Performance"} id={"performance"} />
                    <PerformancePage />
                    <TitleBreak title={"FAQs"} id={"faqs"} />
                    <FaqPage />
            </main>
        );
}

export default Intro;
