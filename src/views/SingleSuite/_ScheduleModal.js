import React from 'react';
import {
    Button,
    Col,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import { times } from '../../utils/array_helpers';

export default (props) => {

    const { className, isOpen, toggle, handleChange, schedule, job } = props;

    return <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={className}
    >
        <ModalHeader toggle={toggle}>Schedule Run</ModalHeader>
        <ModalBody>
            <div>
                {job && <p>Active Schedule is to run every
                                    {!!Number(job.schDays) && <b> {job.schDays} days</b>}
                    {!!Number(job.schHrs) && <b> {job.schHrs} hours</b>}
                    {!!Number(job.schMins) && <b> {job.schMins} minutes</b>}
                </p>}
                {!job && <p>No active schedule in place</p>}
            </div>
            <hr />
            <div>
                <p>Every...</p>
                <Row>
                    <Col xs="4">
                        <FormGroup>
                            <Label htmlFor="sch-days">Days</Label>
                            <Input
                                onChange={(e) => handleChange(e)}
                                defaultValue={job && job.schDays}
                                type="select"
                                id="sch-days"
                                name="schDays">
                                {times(31, n => <option key={n} value={`${n}`}>{n}</option>)}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="4">
                        <FormGroup>
                            <Label htmlFor="sch-hrs">Hours</Label>
                            <Input
                                onChange={(e) => handleChange(e)}
                                defaultValue={job && job.schHrs}
                                type="select"
                                name="schHrs"
                                id="sch-hrs">
                                {times(24, n => <option key={n} value={`${n}`}>{n}</option>)}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="4">
                        <FormGroup>
                            <Label htmlFor="sch-mins">Minutes</Label>
                            <Input
                                onChange={(e) => handleChange(e)}
                                defaultValue={job && job.schMins}
                                type="select" name="schMins"
                                id="sch-mins">
                                {times(60, n => (n % 5 === 0) && <option key={n} value={`${n}`}>{n}</option>)}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
            </div>

        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={(e) => schedule(e)}>Schedule</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal >
}
