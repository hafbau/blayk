import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import StepZilla from '../../components/StepZilla'
import Step1 from './Step1';
import Step2 from '../SingleCase';

export default class CreateTest extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.form = {
            userId: this.props.user && this.props.user._id,
            meta: {
                slack: this.props.user && this.props.user.slack,
                jira: this.props.user && this.props.user.jira,
                pipeline: this.props.user && this.props.user.pipeline,
            },
            title: '',
            cases: [
                {
                    title: '',
                    steps: [],
                    order: 1
                }
            ]
        };
    }

    componentDidMount() { }

    componentWillUnmount() { }

    getForm() {
        return this.form;
    }

    submitForm(e) {
        console.log('suite to be submitted', this.form, 'prps', this.props)
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
        const steps =
            [
                { name: 'New Suite', component: <Step1 getForm={() => (this.getForm())} updateForm={(u) => this.updateForm(u) } /> },
                { name: 'New Case', component: <Step2 getForm={() => (this.getForm())} updateForm={(u) => this.updateForm(u)} isNew={true}/> }
            ]

        return (
            <div className='example'>
                <div className='step-progress'>
                    <StepZilla
                        steps={steps}
                        lastActionText="Save"
                        lastAction={(e) => this.submitForm(e)}
                    />
                </div>
            </div>
        )
    }
}