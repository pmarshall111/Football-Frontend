import React from 'react';
import Form from "react-bootstrap/cjs/Form";

const Preferences = (props: any) => (
    <div>
        <h4>Preferences</h4>
        <div>
            <p>Receive emails with new recommendations as soon as they are released</p>
                <Form.Check></Form.Check>
                <p>Receive quarterly emails summarising performance</p>
                <Form.Check></Form.Check>
        </div>
    </div>
);

export default Preferences;
