import React from 'react';

import "./InfoContainer.css"

const InfoContainer = (props: any) => (
    <div className={"info-container"}>
        {props.children}
    </div>
);

export default InfoContainer;
