import React from 'react';
import Form from "react-bootstrap/cjs/Form";
import Button from "react-bootstrap/cjs/Button";

const ManualSignUp = (props: any) => (
    <Form>
        <Form.Group controlId={"email"}>
            <Form.Label>Email</Form.Label>
            <Form.Control type={"email"} placeholder={"abc@xyz.com"} />
        </Form.Group>
        <Form.Group controlId={"password"}>
            <Form.Label>Password</Form.Label>
            <Form.Control type={"password"} placeholder={"pa55w0rd"} />
            <Form.Control type={"password"} placeholder={"pa55w0rd"} />
        </Form.Group>
        <Button type={"submit"} variant={"primary"}>
            Sign up
        </Button>
    </Form>
);

export default ManualSignUp;
