import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { CardBlock } from "reactstrap";

import ScheduleModal from './_ScheduleModal';
import deepClone from '../../utils/deep_clone';

export default class Case extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            form: {
                schMins: this.props.job ? this.props.job.mins : '',
                schHrs: this.props.job ? this.props.job.hrs : '',
                schDays: this.props.job ? this.props.job.days : '',
            }
        };
    }

    handleChange({ target: { name, value } }) {
        const form = deepClone(this.state.form);
        form[name] = value;

        this.setState(prevState => Object.assign({}, prevState, { form }));
        
        return false;
    }

    runCase() {
        this.setState({
            redirectToRun: true
        });
    }

    schedule(e) {
        this.props.scheduleRun({
            body: this.state.form,
            suiteId: this.props.suiteId,
            order: this.props.testCase.order
        })
        .then(_ => this.toggleModal());
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const props = this.props;
        const { suiteId, testCase = {}, hasIssueService } = props;

        if (this.state.redirectToRun) return <Redirect to={{
            pathname: `/tests/${suiteId}/cases/${testCase._id}/run`,
            state: { testCase, hasIssueService }
        }} />
        
        return (
            <CardBlock className={`card-body`}>
                <Link className="left" to={{
                    pathname: `/tests/${suiteId}/cases/${testCase._id}`,
                    state: { testCase }
                }}>
                    <i className="fa fa-file" aria-hidden="true"></i>
                    <span className="test-name">{testCase.title}</span>
                </Link>
                <div className='right'>
                    
                    <i className="fa fa-play" aria-hidden="true" onClick={() => this.runCase()}></i>

                    <i className="fa fa-clock-o" aria-hidden="true" onClick={() => this.toggleModal()}></i>

                    <i className="fa fa-clone" aria-hidden="true" onClick={() => props.duplicateTestCase(testCase)}></i>
                    <i className="fa fa-arrow-up" aria-hidden="true" onClick={() => props.move(testCase.order, -1)}></i>
                    <i className="fa fa-arrow-down" aria-hidden="true" onClick={() => props.move(testCase.order, 1)}></i>
                    <i className="fa fa-trash" aria-hidden="true" onClick={() => props.deleteTestCase(testCase.order)}></i>
                </div>
                <ScheduleModal
                    isOpen={this.state.modal}
                    toggle={e => this.toggleModal(e)}
                    className={this.props.className}
                    job={testCase.job}
                    schedule={e => this.schedule(e)}
                    handleChange={e => this.handleChange(e)}
                />
            </CardBlock>
        )
    }
}