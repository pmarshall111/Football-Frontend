import React from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {QuestionCircle} from "react-bootstrap-icons";

const QuestionPopover = (props: QuestionPopoverProps) => {
    const {text} = props;
    return (
        <OverlayTrigger trigger={["hover", "focus"]} placement={"bottom"} overlay={
            <Tooltip id={"123"}>
                <p style={{whiteSpace: "pre-wrap"}}>{text}</p>
            </Tooltip>
        }>
            <QuestionCircle />
        </OverlayTrigger>
    )
}

export default QuestionPopover;

export type QuestionPopoverProps = {
    text: String
}
