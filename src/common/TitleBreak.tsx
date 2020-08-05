import React from 'react';

import "./TitleBreak.css"

type TitleBreakProps = {
    title: string
}

const TitleBreak = (props: TitleBreakProps) => (
    <div className={"title-break"}>
        <h3>{props.title}</h3>
    </div>
);

export default TitleBreak;
