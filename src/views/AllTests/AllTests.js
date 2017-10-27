import React, { Component } from 'react';
import {
    Col,
    Row
} from "reactstrap";

import Suite from './_Suite';

// for dev purposes
import fakeSuites from '../../seeds/suites';

class AllTests extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };   
    }

    render() {
        const suites = this.props.tests || fakeSuites;

        return (
            <div className="animated fadeIn">
                
                <Row>
                    <Col>
                        <ul className="tests">
                            {suites.map(suite => <Suite key={suite._id} suite={suite} />)}
                        </ul>    
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AllTests;
