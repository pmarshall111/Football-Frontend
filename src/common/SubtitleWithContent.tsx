import React from 'react';

import "./SubtitleWithContent.css"

const SubtitleWithContent = (props: any) => {
    const {title} = props;

    return (
        <div>
            <h3 className={"title-with-lines"}>{title}</h3>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default SubtitleWithContent;