import React from 'react';
import Tabs from "react-bootstrap/cjs/Tabs";
import Tab from "react-bootstrap/cjs/Tab";
import ManualSignUp from "./ManualSignUp";
import ManualLogin from "./ManualLogin";

const ManualForm = (props: any) => (
    <Tabs defaultActiveKey={"signup"}>
        <Tab eventKey={"signup"} title={"Sign Up"}>
            <ManualSignUp />
        </Tab>
        <Tab eventKey={"logIn"} title={"Log In"}>
            <ManualLogin />
        </Tab>
    </Tabs>
);

export default ManualForm;
