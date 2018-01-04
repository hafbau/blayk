import React from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";

export default (props) => {
    const {
        isOpen,
        issue,
        testCase,
        toggle
    } = props;
    return (
        <Modal isOpen={isOpen} toggle={toggle} >
            <ModalHeader>{issue ? 'Update Issue' : 'Create Issue'}</ModalHeader>
            <ModalBody>
                <div>
                    {JSON.stringify(testCase)}
                </div>
                <hr />

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e) => toggle()}>{issue ? 'Update Issue' : 'Create Issue'}</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
};
