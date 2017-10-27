import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardBlock
} from "reactstrap";

export default (props) => {
    const { suiteId, testCase } = props;

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
                    <i className="fa fa-pencil" aria-hidden="true" onClick={() => props.editTestCase()}></i>
                    <i className="fa fa-play" aria-hidden="true" onClick={() => props.runTestCase()}></i>
                    <i className="fa fa-clone" aria-hidden="true" onClick={() => props.duplicateTestCase()}></i>
                    <i className="fa fa-arrow-up" aria-hidden="true" onClick={() => props.moveUp()}></i>
                    <i className="fa fa-arrow-down" aria-hidden="true" onClick={() => props.moveDown()}></i>
                    <i className="fa fa-trash" aria-hidden="true" onClick={() => props.deleteTestCase()}></i>
                </div>
            </CardBlock>
        </Card>
    </li>
}