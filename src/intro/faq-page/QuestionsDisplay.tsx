import React from 'react';
import Accordion from 'react-bootstrap/Accordion'

import "./QuestionsDisplay.css"

import {faqs} from '../../model/FAQs'
import Card from "react-bootstrap/cjs/Card";

const QuestionsDisplay = (props: any) => {
    const faqSections = faqs.map((x, idx) => {
        return (
            <Card key={x.question}>
                <Accordion.Toggle as={Card.Header} eventKey={idx+""}>
                    {x.question}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={idx+""}>
                    <Card.Body>{x.answer}</Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    })
    return (
        <Accordion className={"questions-display"} defaultActiveKey={"0"}>
            {faqSections}
        </Accordion>
    );
}

export default QuestionsDisplay;
