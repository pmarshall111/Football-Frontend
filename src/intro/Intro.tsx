import React from 'react';
import LandingPage from "./landing-page/LandingPage";
import PerformancePage from "./performance-page/PerformancePage";
import FaqPage from "./faq-page/FaqPage";
import TitleBreak from "../common/TitleBreak";

const Intro = (props: any) => (
    <main>
        <LandingPage />
        <TitleBreak title={"Performance"} />
        <PerformancePage />
        <TitleBreak title={"FAQs"} />
        <FaqPage />
    </main>
);

export default Intro;
