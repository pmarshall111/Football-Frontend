import React from 'react';
import Modal from "react-bootstrap/cjs/Modal";
import ManualForm from "./ManualForm";

const SigninPopup = (props: any) => (
    <Modal.Dialog>
        <Modal.Header>
            <Modal.Title>
                Hi there, you're not logged in!
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ManualForm />
        </Modal.Body>
        <Modal.Footer>
            Or, audit the software using a test account...
        </Modal.Footer>
    </Modal.Dialog>
);

export default SigninPopup;
