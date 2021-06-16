import React from 'react';

import "./TitleBreak.css"

type TitleBreakProps = {
    title: string,
    id?: string
}

const TitleBreak = (props: TitleBreakProps) => (
    <div className={"title-break"} id={props.id || ""}>
        <h3>{props.title}</h3>
    </div>
);

export default TitleBreak;
