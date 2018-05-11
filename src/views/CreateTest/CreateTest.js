import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Button
} from 'reactstrap';
import SingleCase from '../SingleCase';

export default class CreateTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStepIndex: 0
        };

        this.form = {
            userId: this.props.user && this.props.user._id,
            meta: {
                slack: this.props.user && this.props.user.slack,
                jira: this.props.user && this.props.user.jira,
                pipeline: this.props.user && this.props.user.pipeline,
            },
            title: '',
            cases: []
        };
    }

    getForm() {
        return this.form;
    }

    submitForm(e) {
        this.props.createSuite(this.form, this.props.token);
        return <Redirect to="/tests" />
    }

    updateForm(update) {
        this.form = {
            ...this.form,
            ...update,
        }
    }

    render() {
        return (
            <div className='create-test'>
                <SingleCase
                    getForm={() => (this.getForm())}
                    updateForm={(u) => this.updateForm(u)}
                    isNew={true}
                />

                <Button
                    className="float-right"
                    type="submit"
                    size="md"
                    color="primary"
                    onClick={(e) => this.submitForm(e)}
                >Create</Button>
            </div>
        )
    }
}