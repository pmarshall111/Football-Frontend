import React from 'react';

import "./TitleBreak.css"

type TitleBreakProps = {
    title: string,
    id?: string,
    subtitle?: string
    children?: any
}

const TitleBreak = (props: TitleBreakProps) => (
    <div className={"title-break"} id={props.id || ""}>
        <div className={"text-box"}>
            <h3>{props.title}</h3>
            <h6>{props.subtitle}</h6>
        </div>
        <div className={"children"}>
            {props.children}
        </div>
    </div>
);

export default TitleBreak;
