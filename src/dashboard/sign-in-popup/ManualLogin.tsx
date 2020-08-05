import Form from "react-bootstrap/cjs/Form";
import React from "react";
import Button from "react-bootstrap/cjs/Button";

const ManualLogin = (props: any) => (
    <Form>
        <Form.Group controlId={"email"}>
            <Form.Label>Email</Form.Label>
            <Form.Control type={"email"} placeholder={"abc@xyz.com"} />
        </Form.Group>
        <Form.Group controlId={"password"}>
            <Form.Label>Password</Form.Label>
            <Form.Control type={"password"} placeholder={"pa55w0rd"} />
        </Form.Group>
        <Button type={"submit"} variant={"primary"}>
            Log in
        </Button>
    </Form>
);

export default ManualLogin;
