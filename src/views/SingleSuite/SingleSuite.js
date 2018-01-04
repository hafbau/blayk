import React, { Component } from 'react';
import {
    Col,
    Row
} from "reactstrap";

import Case from './_Case';
import cuid from 'cuid';
import deepClone from '../../utils/deep_clone';
import { set } from '../../utils/resolve_object_path';

class SingleSuite extends Component {
    constructor(props) {
        super(props)
        const suite = Object.assign({},
            this.props.location.state.suite,
            {
                meta: {
                    slack: this.props.user && this.props.user.slack,
                    jiraURL: this.props.user && this.props.user.jiraURL,
                    jiraUsername: this.props.user && this.props.user.jiraUsername,
                    jiraPassword: this.props.user && this.props.user.jiraPassword,
                    pipeline: this.props.user && this.props.user.pipeline,
                }
            }
        )
        this.state = {
            suite, // TODO: fallback to go fetch it (componentWillMount) if not in location state e.g. when entered to the address bar directly
            hasIssueService: !!(suite.meta.jiraURL && suite.meta.jiraUsername && suite.meta.jiraPassword)
        };   
    }
    componentWillReceiveProps(nextProps, nextState) {
        console.log('new propss to help with update after a change', nextProps)
        
    }
    deleteTestCase(order) {
        const suite = deepClone(this.state.suite);
        const newTestCases = suite.cases
            .filter(s => s.order !== order)
            .map(s => s.order > order ? s.order-- && s : s);

        suite.cases = newTestCases;
        this.props.updateSuite(suite);
        // this.setState(prevState => Object.assign({}, prevState, { suite }));
        return false;
    }

    duplicateTestCase(testCase) {
        const suite = deepClone(this.state.suite);
        const newTestCase = Object.assign({}, deepClone(testCase), { order: suite.cases.length + 1 });

        delete newTestCase.lastRun;
        delete newTestCase.isPassing;
        delete newTestCase.lastPassed;

        newTestCase.title = newTestCase.title + 'copy';
        newTestCase.createdAt = Date.now();
        newTestCase.meta = {};

        newTestCase.steps = newTestCase.steps.map(step => {
            const { order, category, options, target, type } = step;
            return { order, category, options, target, type };
        });

        suite.cases.push(newTestCase)
        this.props.updateSuite(suite);
        // this.setState(prevState => Object.assign({}, prevState, { suite }));
        return false;
    }

    handleChange({ target: { name, value } }) {
        const suite = set(deepClone(this.state.suite), name, value);
        this.setState(prevState => Object.assign({}, prevState, { suite }));
        return false;
    }

    move(order, increment) {
        const suite = deepClone(this.state.suite);
        const index = suite.cases.findIndex(testCase => testCase.order === order);

        if (index + increment > -1 && index + increment < suite.cases.length) {
            const testCaseToMove = suite.cases.splice(index, 1)[0];
            suite.cases.splice(index + increment, 0, testCaseToMove)

            suite.cases = suite.cases.map((testCase, i) => {
                testCase.order = i + 1;
                return testCase;
            });
        }
        this.setState(prevState => Object.assign({}, prevState, { suite }));
        return false;
    }

    update() {
        if (typeof this.props.updateCase === 'function') this.props.updateCase(this.state.suite);
        return false
    }


    render() {
        const { hasIssueService, suite } = this.state;
        if (!suite) return null; // TODO: redirect & throw an error instead

        return (
            <div className="animated fadeIn">
                <header>
                    <h3>
                        <span>Test cases in {suite.title}</span>
                    </h3>
                    <hr/>
                </header>
                <Row>
                    <Col>
                        <ul className="tests">
                            {suite.cases.map(testCase => <Case
                                deleteTestCase={(step) => this.deleteTestCase(step)}
                                duplicateTestCase ={(step) => this.duplicateTestCase (step)}
                                handleChange={(e) => this.handleChange(e)}
                                key={cuid()}
                                move={(order, increment) => this.move(order, increment)}
                                runTestCase={(suiteId, order) => this.props.runCase(suiteId, order)}
                                scheduleRun={(args) => this.props.scheduleRun(args)}
                                suiteId={suite._id}
                                testCase={testCase}
                                hasIssueService={hasIssueService}
                            />)}
                        </ul>    
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SingleSuite;
