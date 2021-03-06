import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <StatusIcon status={this.props.status} />
                <ResultDetail results={this.props.results}/>
            </div>
        )
    }
}

export default Result;

const ResultDetail = ({ results }) => {
    return (
        <div className="Result-Detail">
            <h3>Result by steps</h3>
            
            <ul className={`results`} >
                {results.map((result, index) => {
                    return (
                        <li className={`result-item`} key={index} >
                            <Row>
                                <Col xs="12" sm="12" md="9" lg="9">
                                    {index + 1}. &nbsp;{formulateStepText(result) || "Step description placeholder"}
                                </Col>

                                <Col xs="12" sm="12" md="3" lg="3" >
                                    {result.pass ? 
                                        <span className="pass"><i className="icon-check"></i> Pass</span>
                                    :
                                        <span className="fail"><i className="icon-close"></i> Fail</span>
                                    }
                                </Col>
                            </Row>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const StatusIcon = ({ classNames, status }) => {
    return (
        <div className={`Status-Icon ${classNames || ""}`} >
            <i className={`icon-${status === "done" ? "check pass" : "close fail"}`}></i>
        </div>
    )
}

const formulateStepText = ({ type, options, target }) => {

    const action = {
        'click': 'Click',
        'get': 'Go to',
        'sendKeys': 'Fill',
        'textContains': 'Text',
        'textNotContains': 'Text'
    }[type];

    switch (type) {
        case 'click':
            return `${action} ${target ? target.value : ''}`;
        
        case 'get':
            return `${action} ${options ? options.value : ''}`;

        case 'sendKeys':
            return `${action} ${options ? options.value : ''} into ${target ? target.value : ''}`;

        case 'textContains':
            return `${action} in ${target ? target.value : ''} contains ${options ? options.value : ''}`;

        case 'textNotContains':
            return `${action} in ${target ? target.value : ''} does not contain ${options ? options.value : ''}`;
        
        default:
            return 'performing unspecified action'    
    }
}
