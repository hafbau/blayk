import React, { Component } from 'react';
import {
    Button,
    Col,
    Input,
    Row
} from "reactstrap";

import cuid from 'cuid';
import Step from './_Step';
import deepClone from '../../utils/deep_clone';
import { set } from '../../utils/resolve_object_path';

class SingleCase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            testCase: this.props.location.state.testCase // TODO: fallback to go fetch it if not in loccation state e.g. when entered to the address bar directly
        };   
    }

    deleteStep(order) {
        const testCase = deepClone(this.state.testCase);
        const newSteps = testCase.steps
            .filter(s => s.order !== order)
            .map(s => s.order > order ? s.order-- && s : s);
        
        testCase.steps = newSteps;
        this.setState(prevState => Object.assign({}, prevState, { testCase }));
        return false;
    }

    duplicateStep(step) {
        const testCase = deepClone(this.state.testCase);
        const newStep = Object.assign({}, deepClone(step), { order: testCase.steps.length + 1 });
        
        testCase.steps.push(newStep)
        this.setState(prevState => Object.assign({}, prevState, { testCase }));
        return false;
    }
    
    handleChange({ target: { name, value } }) {
        const testCase = set(deepClone(this.state.testCase), name, value);
        console.log('new testCase', testCase)
        this.setState(prevState => Object.assign({}, prevState, { testCase }));
        return false;
    }
    
    move(order, increment) {
        const testCase = deepClone(this.state.testCase);
        const index = testCase.steps.findIndex(step => step.order === order);
        
        if (index + increment > -1 && index + increment < testCase.steps.length) {
            const stepToMove = testCase.steps.splice(index, 1)[0];
            testCase.steps.splice(index + increment, 0, stepToMove)
            
            testCase.steps = testCase.steps.map((step, i) => {
                step.order = i + 1;
                return step;
            });
        }
        this.setState(prevState => Object.assign({}, prevState, { testCase }));
        return false;
    }

    render() {
        const testCase = this.state.testCase;
        if (!testCase) return null;
        return (
            <div className="animated fadeIn">
                <header>
                    <h3 style={{ display: 'flex' }}>
                        <div className="left">    
                            <span>Test Steps in </span>
                            <Input
                                onChange={(e) => this.handleChange(e)}
                                name={`title`}
                                type="text"
                                id={`test-case-title`}
                                placeholder="Enter test case title here"
                                defaultValue={testCase.title}
                                style={{
                                    display: 'inline',
                                    width: 'auto',
                                    fontSize: 'inherit'
                                }}
                            />
                        </div>
                        <div className="right">
                            <Button
                                style={{ marginLeft: 'auto', flex: '0.4' }}
                                type="submit"
                                size="md"
                                color="primary"
                            >Add</Button>
                            <Button
                                style={{ marginLeft: 'auto', flex: '0.4' }}
                                type="submit"
                                size="md"
                                color="primary"
                            >Update</Button>
                        </div>
                    </h3>
                    <hr/>
                </header>
                <Row>
                    <Col>
                        <ul className="tests">
                            {testCase.steps.map(step => <Step
                                key={cuid()}
                                deleteStep={(step) => this.deleteStep(step)}
                                duplicateStep={(step) => this.duplicateStep(step)}
                                move={(order, increment) => this.move(order, increment)}
                                handleChange={(e) => this.handleChange(e)}
                                step={step}
                            />)}
                        </ul>    
                    </Col>
                </Row>

                <footer style={{ padding: '1.25rem 0', marginBottom: '2.5rem' }}>
                    <Button
                    type="submit"
                    size="md"
                    color="primary"
                    >Add</Button>
                    <Button
                    className="float-right"
                    type="submit"
                    size="md"
                    color="primary"
                    >Update</Button>
                </footer>
            </div>
        )
    }
}

export default SingleCase;
