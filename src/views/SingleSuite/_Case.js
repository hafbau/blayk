import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardBlock,
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

import deepClone from '../../utils/deep_clone';
import { times } from '../../utils/array_helpers';

export default class Case extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            form: {
                schMins: this.props.job ? this.props.job.mins : '',
                schHrs: this.props.job ? this.props.job.hrs : '',
                schDays: this.props.job ? this.props.job.days : '',
            }
        };

        this.toggle = this.toggle.bind(this);
    }

    handleChange({ target: { name, value } }) {
        const form = deepClone(this.state.form);
        form[name] = value;

        this.setState(prevState => Object.assign({}, prevState, { form }));
        
        return false;
    }

    schedule(e) {
        console.log(
            'Im scheduling stuff', this.state.form
        )
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const props = this.props;
        const { job, suiteId, testCase } = props;

        return <li className="test">
            <Card>
                <CardBlock className={`card-body`}>
                    <Link className="left" to={{
                        pathname: `/tests/${suiteId}/cases/${testCase._id}`,
                        state: { testCase }
                    }}>
                        <i className="fa fa-file" aria-hidden="true"></i>
                        <span className="test-name">{testCase.title}</span>
                    </Link>
                    <div className='right'>
                        <Link to={{
                            pathname: `/tests/${suiteId}/cases/${testCase._id}/run`,
                            state: { testCase }
                        }}>
                            <i className="fa fa-play" aria-hidden="true"></i>
                        </Link>
                        <Button onClick={this.toggle}>L</Button>
                        <i className="fa fa-clone" aria-hidden="true" onClick={() => props.duplicateTestCase(testCase)}></i>
                        <i className="fa fa-arrow-up" aria-hidden="true" onClick={() => props.move(testCase.order, -1)}></i>
                        <i className="fa fa-arrow-down" aria-hidden="true" onClick={() => props.move(testCase.order, 1)}></i>
                        <i className="fa fa-trash" aria-hidden="true" onClick={() => props.deleteTestCase(testCase.order)}></i>
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Schedule Run</ModalHeader>
                        <ModalBody>
                            <div>
                                {job && <p>Active Schedule is to run every {job.mins} minutes</p>}
                                {!job && <p>No active schedule in place</p>}
                            </div>
                            <hr />
                            <div>
                                <Row>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="sch-mins">Minutes</Label>
                                            <Input onChange={(e) => this.handleChange(e)} type="select" name="schMins" id="sch-mins">
                                                {times(60, n => <option key={n} value={`${n}`}>{n}</option>)}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="sch-hrs">Hours</Label>
                                            <Input onChange={(e) => this.handleChange(e)} type="select" name="schHrs" id="sch-hrs">
                                                {times(24, n => <option key={n} value={`${n}`}>{n}</option>)}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="sch-days">Days</Label>
                                            <Input onChange={(e) => this.handleChange(e)} type="select" id="sch-days" name="schDays" placeholder="123" required >
                                                {times(31, n => <option key={n} value={`${n}`}>{n}</option>)}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>

                    </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={(e) => this.schedule(e)}>Schedule</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </CardBlock>
            </Card>
        </li>
    }
}