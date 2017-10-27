import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardBlock
} from "reactstrap";

export default (props) => {
    const suite = props.suite;

    return <li className="test">
        <Card>
            <CardBlock className={`card-body`}>
                <Link className="left" to={{
                    pathname: `/tests/${suite._id}`,
                    state: { suite }
                }}>
                    <i className="fa fa-suitcase" aria-hidden="true"></i>
                    <span className="test-name">{suite.title}</span>
                </Link>
                <div className='right'>
                    <i className="fa fa-play" aria-hidden="true" onClick={() => props.runSuite()}></i>
                    <i className="fa fa-clone" aria-hidden="true" onClick={() => props.duplicateSuite()}></i>
                    <i className="fa fa-trash" aria-hidden="true" onClick={() => props.deleteSuite()}></i>
                </div>
            </CardBlock>
        </Card>
    </li>
}