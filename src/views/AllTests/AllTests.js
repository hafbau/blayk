import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Col,
    Row
} from "reactstrap";

import Suite from './_Suite';
import deep_clone from '../../utils/deep_clone';

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

    duplicateSuite(suite) {
        const newSuite = deep_clone(suite);
        delete newSuite._id;
        delete newSuite.createdAt;
        delete newSuite.updatedAt;

        const titleArr = suite.title.split('copy ');
        const num = parseFloat(titleArr[titleArr.length - 1]);
        newSuite.title = num ? newSuite.title.replace(`${num}`, `${num + 1}`) : `${newSuite.title} copy 1`;

        return this.props.createSuite(newSuite);
    }

    render() {
        const suites = this.state.suites;
        return (
            <div className="animated fadeIn">
                <div className="content-head">
                    <Link className="left" to="/tests/new">
                        <Button>Create</Button>
                    </Link>
                </div>
                <Row>
                    <Col>
                        <ul className="tests">
                            {suites.map(suite => <Suite
                                {...this.props}
                                key={suite._id}
                                suite={suite}
                                deleteSuite={(suite) => this.props.deleteSuite(suite)}
                                duplicateSuite={(suite) => this.duplicateSuite(suite)}
                            />)}
                        </ul>    
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AllTests;
