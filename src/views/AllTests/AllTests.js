import React, { PureComponent } from 'react';
import {
    Button,
    Col,
    Row
} from "reactstrap";

import Suite from './_Suite';

class AllTests extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            suites: this.props.suites || []
        };   
    }

    componentWillMount() {
        this.props.getAllSuites();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => Object.assign({}, prevState, { suites: nextProps.suites }))
    }

    deleteSuite(suite) {

    }

    duplicateSuite(suite) {

    }

    render() {
        const suites = this.state.suites;
        return (
            <div className="animated fadeIn">
                <div className="content-head">
                    <Button>Create</Button>
                </div>
                <Row>
                    <Col>
                        <ul className="tests">
                            {suites.map(suite => <Suite
                                {...this.props}
                                key={suite._id}
                                suite={suite}
                                deleteSuite={(suite) => this.props.deleteSuite(suite)}
                                duplicateSuite={(suite) => this.props.duplicateSuite(suite)}
                            />)}
                        </ul>    
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AllTests;
