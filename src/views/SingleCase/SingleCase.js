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
            testCase: this.getState()
        };
    }
    
    addStep() {
        const testCase = deepClone(this.state.testCase);
        const newStep = {
            order: testCase.steps.length + 1,
            options: {},
            target: {},
        }
        
        testCase.steps.push(newStep);
        this.setState(prevState => Object.assign({}, prevState, { testCase }));
    }
    
    deleteStep(order) {
        const testCase = deepClone(this.state.testCase);
        const newSteps = testCase.steps
        .filter(s => s.order !== order)
        .map(s => s.order > order ? s.order-- && s : s);
        
        testCase.steps = newSteps;
        this.setState(prevState => Object.assign({}, prevState, { testCase }));
    }
    
    duplicateStep(step) {
        const testCase = deepClone(this.state.testCase);
        const newStep = Object.assign({}, deepClone(step), { order: testCase.steps.length + 1 });
        
        testCase.steps.push(newStep)
        this.setState(prevState => Object.assign({}, prevState, { testCase }));
    }

    getState() {
        let testCase = {
            title: '',
            steps: [{
                order: 1,
                options: {},
                target: {},
            }],
            order: 1,
            suite: {}
        };
        const { isNew, match, suites } = this.props;
        const { id, suiteId } = match.params;
        let suite = suites.find(s => s._id === suiteId);

        if (!isNew && id && suite) {
            if (id === 'new' && suite) testCase = Object.assign({},
                testCase,
                { suite: { id: suiteId, title: suite.title } },
                { order: suite.cases.length }
            )
            else testCase = suite.cases.find(c => c._id === id)
        } else suite = {
            userId: this.props.user && this.props.user._id,
            meta: {
                slack: this.props.user && this.props.user.slack,
                jira: this.props.user && this.props.user.jira,
                pipeline: this.props.user && this.props.user.pipeline,
            },
            title: '',
            cases: []
        };
        
        return { suite, testCase };
    }
    
    handleChange({ target: { name, value } }) {
        const testCase = set(deepClone(this.state.testCase), name, value);
        this.setState(prevState => Object.assign({}, prevState, { testCase }));

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
    }

    update() {
        const testCase = this.state.testCase;
        const suite = this.state.suite;
        const caseIndex = suite && get(suite, "cases", []).findIndex(c => c.order === testCase.order)
        suite.cases[caseIndex] = testCase;

        if (suite.title !== testCase.suite.title) {
            suite.title = testCase.suite.title;
            suite.cases = suite.cases.map(tCase => {
                tCase.suite.title = suite.title;
                return tCase;
            })
        }
        this.props.updateSuite(suite);
    }

    render() {
        const { testCase } = this.state;
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
