import React from 'react';
import QuestionsDisplay from "./QuestionsDisplay";

import "./FaqPage.css"
import TitleBreak from "../../common/TitleBreak";

const FaqPage = (props: any) => (
    <section className={"faq-page"}>
        <TitleBreak title={"FAQs"} id={"faqs"} subtitle={"Any questions..."} />
        <QuestionsDisplay />
    </section>
);

export default FaqPage;
