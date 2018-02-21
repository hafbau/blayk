import React, { Component } from 'react';
import { HashLoader } from 'react-spinners';
import {
    Button,
    Col,
    Card,
    CardBlock,
    CardFooter,
    CardHeader,
    Row
} from "reactstrap";

import IssueModal from './IssueModal';
import { MediaPanel, RunState } from '../../components';

class RunTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            caseToRun: this.props.location.state ? this.props.location.state.testCase : null,
            hasIssueService: this.props.location.state ? this.props.location.state.hasIssueService : null,
            results: []
        };

        
    }

    componentDidMount() {
        if (this.state.caseToRun && !this.props.loading) {
            const { order, suite: { id } } = this.state.caseToRun;
            if (order && id) this.props.runCase(id, order);
        }
    }

    componentWillReceiveProps({ result, results, status }) {
        // should check if result is already being handled
        if (result &&
            ((this.state.result &&
                result.stepOrder !== this.state.result.stepOrder) ||
                !this.state.result)
        ) this.handleResult(result, status)

        if (results && results.length) this.setState((state, props) => Object.assign({},
            state, { results, status: (results[results.length - 1].pass ? "done" : "terminated") })// status is based on last result
        )
    }

    toggleIssueModal() {
        if (this.state.issueModal) return this.setState({
            issueModal: false,
            description: '',
            summary: '',
            issueType: '',
            project: ''
        })
        this.props.fetchProjects(this.props.user)
        this.setState({ issueModal: true });
    }

    handleChange({ target: { name, value } }) {
        this.setState({ [name]: value })
    }
    handleResult(result, status) {
        this.setState((prevState, props) => {
            const results = prevState.results;
            results.push(result);
            
            return Object.assign({},
                prevState,
                { result, results, status }
            )
        })
    }

    runAgain() {
        this.setState((state, props) => Object.assign({},
            state, {result: null, results: [], status: "pending"}
        ));
        this.componentDidMount();
    }

    saveIssue() {
        const fields = {};
        const {
            caseToRun,
            description,
            issueType,
            project,
            summary,

        } = this.state;
        // const issue = (caseToRun && caseToRun.meta && caseToRun.meta.issue) || {};

        fields["issuetype"] = { "id": issueType };
        fields["project"] = { "id": project };
        fields["summary"] = summary;
        fields["description"] = description;

        this.props.saveIssue(this.props.user, { "fields": fields })
        this.toggleIssueModal()

    }

    render() {
        const {
            caseToRun,
            hasIssueService,
            issueModal,
            result,
            results,
            status
        } = this.state;
        const issue = caseToRun && caseToRun.meta && caseToRun.meta.issue;
        const isRunning = this.props.running;

        return (
            <div className="animated fadeIn">
                
                {!!caseToRun && <Row>
                    <Col xs="12" sm="12" md="6" lg="6">
                        <Card>
                            <CardHeader>
                                Running Test Case {caseToRun.name || "unnamed"} from Test suite foo
                            </CardHeader>

                            <CardBlock className={`card-body`}>
                                <RunState
                                    running={isRunning}
                                    result={result}
                                    results={results}
                                    status={status} />

                            </CardBlock>

                            <CardFooter>
                                {!!results.length && hasIssueService && <Button
                                    color="secondary"
                                    disabled={isRunning}
                                    onClick={() => this.toggleIssueModal()}
                                    size="md"
                                    type="submit"
                                >{!!issue ? 'Update Issue' : 'Create Issue'}</Button>}

                                <Button
                                    className="float-right"
                                    color="primary"
                                    disabled={isRunning}
                                    onClick={() => this.runAgain()}
                                    size="md"
                                    type="submit"
                                >{isRunning ? 
                                    <span className="loading-label">
                                        <HashLoader color="#fff" size={13} />
                                        &nbsp;&nbsp;Running
                                    </span>
                                :
                                    "Run Again"
                                }</Button>
                            </CardFooter>
                        </Card>
                    </Col>

                    <Col xs="12" sm="12" md="6" lg="6">
                        <MediaPanel
                            image={result && result.image}
                            images={results && results.map(result => result.meta.imageDataUrl)}/>
                    </Col>

                    <IssueModal
                        handleChange={(e) => this.handleChange(e)}    
                        isOpen={issueModal}
                        issue={issue}
                        projects={this.props.jiraProjects}
                        saveIssue={() => this.saveIssue()}
                        selectedIssueProjectId={this.state.project}
                        testCase={caseToRun}
                        toggle={(e) => this.toggleIssueModal(e)}
                    />
                </Row>}
            </div>
        )
    }
}

export default RunTest;
