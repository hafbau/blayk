import React, { Component } from 'react';
import {
    Col,
    Row
} from "reactstrap";

import Case from './_Case';

class AllTests extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };   
    }

    render() {
        const suite = this.props.location.state.suite; // TODO: fallback to go fetch it if not in loccation state e.g. when entered to the address bar directly
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
                            {suite.cases.map(testCase => <Case key={testCase._id} testCase={testCase} suiteId={suite._id} />)}
                        </ul>    
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AllTests;
