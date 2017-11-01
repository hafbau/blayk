import React, { Component } from 'react';
import {
    Col,
    Row
} from "reactstrap";

import Case from './_Case';
import cuid from 'cuid';
import deepClone from '../../utils/deep_clone';
import { set } from '../../utils/resolve_object_path';

class AllTests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suite: this.props.location.state.suite // TODO: fallback to go fetch it if not in loccation state e.g. when entered to the address bar directly
        };   
    }

    deleteTestCase(order) {
        const suite = deepClone(this.state.suite);
        const newTestCases = suite.cases
            .filter(s => s.order !== order)
            .map(s => s.order > order ? s.order-- && s : s);

        suite.cases = newTestCases;
        this.setState(prevState => Object.assign({}, prevState, { suite }));
        return false;
    }

    duplicateTestCase(testCase) {
        const suite = deepClone(this.state.suite);
        const newTestCase = Object.assign({}, deepClone(testCase), { order: suite.cases.length + 1 });

        suite.cases.push(newTestCase)
        this.setState(prevState => Object.assign({}, prevState, { suite }));
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
        const suite = this.state.suite;
        if (!suite) return null;

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
                                key={cuid()}
                                testCase={testCase}
                                suiteId={suite._id}
                                deleteTestCase={(step) => this.deleteTestCase(step)}
                                duplicateTestCase ={(step) => this.duplicateTestCase (step)}
                                move={(order, increment) => this.move(order, increment)}
                                handleChange={(e) => this.handleChange(e)}
                            />)}
                        </ul>    
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AllTests;
