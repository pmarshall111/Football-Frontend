import React from 'react';
import QuestionsDisplay from "./QuestionsDisplay";

import "./FaqPage.css"
import TitleBreak from "../../common/TitleBreak";

const FaqPage = () => (
    <section className={"faq-page"}>
        <TitleBreak title={"FAQs"} id={"faqs"} />
        <QuestionsDisplay />
    </section>
);

export default FaqPage;
