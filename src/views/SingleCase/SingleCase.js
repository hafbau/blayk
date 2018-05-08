import React, { Component } from 'react';
import {
    Button,
    Col,
    Label,
    Input,
    Row
} from "reactstrap";

import cuid from 'cuid';
import Step from './_Step';
import deepClone from '../../utils/deep_clone';
import { set, get } from '../../utils/resolve_object_path';

class SingleCase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            testCase: this.getCase()
        };
    }
    
    add() {
        const testCase = deepClone(this.state.testCase);
        const newStep = {
            order: testCase.steps.length + 1,
            options: {},
            target: {},
        }
        
        testCase.steps.push(newStep);
        this.setState(prevState => Object.assign({}, prevState, { testCase }));
        return this.updateNewSuiteIfNew(testCase);
    }
    
    deleteStep(order) {
        const testCase = deepClone(this.state.testCase);
        const newSteps = testCase.steps
        .filter(s => s.order !== order)
        .map(s => s.order > order ? s.order-- && s : s);
        
        testCase.steps = newSteps;
        this.setState(prevState => Object.assign({}, prevState, { testCase }));
        return this.updateNewSuiteIfNew(testCase);
    }
    
    duplicateStep(step) {
        const testCase = deepClone(this.state.testCase);
        const newStep = Object.assign({}, deepClone(step), { order: testCase.steps.length + 1 });
        
        testCase.steps.push(newStep)
        this.setState(prevState => Object.assign({}, prevState, { testCase }));
        return this.updateNewSuiteIfNew(testCase);
    }

    getCase() {
        let testCase;
        if (this.props.isNew) testCase = this.props.getForm().cases[0];
        else testCase = this.props.location && this.props.location.state ?
            this.props.location.state.testCase :
            this.props.testCase && this.props.testCase.steps ?
                this.props.testCase : { steps: [] }// TODO: fallback to go fetch it if not in loccation state e.g. when entered to the address bar directly
        
        return testCase;
    }
    
    handleChange({ target: { name, value } }) {
        const testCase = set(deepClone(this.state.testCase), name, value);
        this.setState(prevState => Object.assign({}, prevState, { testCase }));

        return this.updateNewSuiteIfNew(testCase);
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
        return this.updateNewSuiteIfNew(testCase);
    }

    update() {
        const testCase = this.state.testCase;
        if (!testCase.suite && !testCase.suite.id) return

        this.props.getSuite(testCase.suite.id)
            .then(_ => {
                console.log('got suite about to update')
                const suite = this.props.suite;
                const caseIndex = suite && get(suite, "cases", []).findIndex(c => c.order === testCase.order)
                
                suite.cases[caseIndex] = testCase;
                this.props.updateSuite(suite);
            })
        return false
    }

    updateNewSuiteIfNew(testCase) {
        if (this.props.isNew) {
            const form = this.props.getForm();
            form.cases[0] = testCase;
            form.title = get(testCase, 'suite.title') || form.title;
            this.props.updateForm(form);
        }
        return false;
    }

    render() {
        const testCase = this.state.testCase;
        if (!testCase) return null;
        return (
            <div className="animated fadeIn">
                <header>
                    <div className="single-case-header" style={{ display: 'flex' }}>
                        <div>
                            <Label className="case-name-label">Suite Title</Label>
                            <Input
                                onChange={(e) => this.handleChange(e)}
                                name="suite.title"
                                type="text"
                                id="test-suite-title"
                                placeholder="Suite title here..."
                                defaultValue={testCase.suite.title}
                                className="editable-label"
                                style={{ width: `150px`}}
                            />
                        </div>

                        <div>
                            <Label className="case-name-label">Case Name</Label>
                            <Input
                                onChange={(e) => this.handleChange(e)}
                                name="title"
                                type="text"
                                id="test-case-title"
                                placeholder="Case title here..."
                                defaultValue={testCase.title}
                                className="editable-label"
                                style={{ width: `150px`}}
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                size="md"
                                color="primary"
                                onClick={() => this.add()}
                                className="btn-add-step"
                            >Add Step</Button>
                            {!this.props.isNew && <Button
                                type="submit"
                                size="md"
                                color="primary"
                                onClick={() => this.update()}
                            >Update Case</Button>}
                        </div>
                    </div>
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

                {!this.props.isNew && <footer style={{ padding: '1.25rem 0', marginBottom: '2.5rem' }}>
                    <Button
                    type="submit"
                    size="md"
                    color="primary"
                    onClick={() => this.add()}    
                    >Add Step</Button>
                    <Button
                    className=""
                    type="submit"
                    size="md"
                    color="primary"
                    onClick={() => this.update()}
                    style={{ marginLeft: '1.5rem' }}    
                    >Update Case</Button>
                </footer>}
            </div>
        )
    }
}

export default SingleCase;
