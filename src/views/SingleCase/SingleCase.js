import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { logout, updateUser } from '../../action_creators/auth';
import {
  createSuite,
  getAllSuites,
  getSuite,
  runCase,
  scheduleRun,
  saveAndRun,
  updateSuite
} from '../../action_creators/test';
import { fetchProjects, saveIssue } from '../../action_creators/external'

import { createListener } from '../../listeners';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    Button,
    Col,
    Label,
    Input,
    Row
} from "reactstrap";

import cuid from 'cuid';
import Step from './_Step';
import Page500 from '../Page500';
import deepClone from '../../utils/deep_clone';
import { set, get } from '../../utils/resolve_object_path';

class SingleCase extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    componentWillMount() {
        if (!this.props.suites) this.props.getAllSuites();
        this.getState();
    }

    componentWillReceiveProps(nextProps) {
        const { suite, testCase } = this.state;
        if (!suite || !testCase) this.getState(nextProps);
    }

    getState(props = this.props) {
        let testCase = {
            title: '',
            steps: [{
                order: 1,
                options: {},
                target: {},
            }],
            order: 1,
            suite: {}
        };
      
        const { match, suites } = props;
        const { id, suiteId } = match.params;
        const isNew = !(id && suiteId);
        let suite = suites.find(s => s._id === suiteId);

        if (!isNew && id && suite) {
            if (id === 'new' && suite) testCase = Object.assign({},
                testCase,
                { suite: { id: suiteId, title: suite.title } },
                { order: suite.cases.length }
            )
            else testCase = suite.cases.find(c => c._id === id)
        } else suite = {
            userId: props.user && props.user._id,
            meta: {
                slack: props.user && props.user.slack,
                jira: props.user && props.user.jira,
                pipeline: props.user && props.user.pipeline,
            },
            title: '',
            cases: []
        };
        
        this.setState(prevState => Object.assign({}, prevState, { suite, testCase, isNew }));
    }

    addStep() {
        const testCase = deepClone(this.state.testCase);
        const newStep = {
            order: testCase.steps.length + 1,
            options: {},
            target: {},
        }

        testCase.steps.push(newStep);
        this.setState(prevState => Object.assign({}, prevState, {
            testCase
        }));
    }

    deleteStep(order) {
        const testCase = deepClone(this.state.testCase);
        const newSteps = testCase.steps
            .filter(s => s.order !== order)
            .map(s => s.order > order ? s.order-- && s : s);

        testCase.steps = newSteps;
        this.setState(prevState => Object.assign({}, prevState, {
            testCase
        }));
    }

    duplicateStep(step) {
        const testCase = deepClone(this.state.testCase);
        const newStep = Object.assign({}, deepClone(step), {
            order: testCase.steps.length + 1
        });

        testCase.steps.push(newStep)
        this.setState(prevState => Object.assign({}, prevState, {
            testCase
        }));
    }
    
    handleChange({ target: { name, value } }) {
        const testCase = set(deepClone(this.state.testCase), name, value);
        this.setState(prevState => Object.assign({}, prevState, { testCase }));

    }
    
    move(order, increment) {
        const testCase = deepClone(this.state.testCase);
        const index = testCase.steps.findIndex(step => step.order === order);
        
        if (index + increment > -1 && index + increment < testCase.steps.length) {
            const stepToMove = testCase.steps.splice(index, 1)[0];
            testCase.steps.splice(index + increment, 0, stepToMove)
            
            testCase.steps = testCase.steps.map((step, i) => {
                step.order = i + 1;
                return step;
            });
        }
        this.setState(prevState => Object.assign({}, prevState, { testCase }));
    }

    save() {
        const { isNew, suite, testCase } = this.state;
        if (suite) {
            const caseIndex = isNew ? 0 : get(suite, "cases", []).findIndex(c => c.order === testCase.order)
            suite.cases[caseIndex] = testCase;

            if (suite.title !== testCase.suite.title) {
                suite.title = testCase.suite.title;
                suite.cases = suite.cases.map(tCase => {
                    tCase.suite.title = suite.title;
                    return tCase;
                })
            }

            if (isNew) this.props.createSuite(suite)
            else this.props.updateSuite(suite);
        }
        this.setState(prevState => Object.assign({}, prevState, { redirectToTests: true }));
    }

    render() {
        const { redirectToTests, suite, testCase } = this.state;
        if (redirectToTests) return <Redirect to={`/tests#${suite ? suite._id : "_"}`} />
        if (!testCase) return <Page500 />;
        
        return (
            <form className="animated fadeIn" >
                <header>
                    <div className="single-case-header" style={{ display: 'flex' }}>
                        <div>
                            <Label className="case-name-label">Suite Title</Label>
                            <Input
                                onChange={(e) => this.handleChange(e)}
                                name="suite.title"
                                type="text"
                                id="test-suite-title"
                                placeholder="Suite title here..."
                                defaultValue={testCase.suite.title}
                                className="editable-label"
                                style={{ width: `150px`}}
                            />
                        </div>

                        <div>
                            <Label className="case-name-label">Case Name</Label>
                            <Input
                                onChange={(e) => this.handleChange(e)}
                                name="title"
                                type="text"
                                id="test-case-title"
                                placeholder="Case title here..."
                                defaultValue={testCase.title}
                                className="editable-label"
                                style={{ width: `150px`}}
                            />
                        </div>
                    </div>
                    <hr/>
                </header>
                <Row>
                    <Col>
                        <ul className="tests">
                            {testCase.steps.map(step => <Step
                                key={cuid()}
                                deleteStep={(step) => this.deleteStep(step)}
                                duplicateStep={(step) => this.duplicateStep(step)}
                                move={(order, increment) => this.move(order, increment)}
                                handleChange={(e) => this.handleChange(e)}
                                step={step}
                            />)}
                        </ul>    
                    </Col>
                </Row>

                <footer style={{ padding: '1.25rem 0', marginBottom: '2.5rem' }}>
                    <Button
                    type="button"
                    size="md"
                    color="primary"
                    onClick={() => this.addStep()}    
                    >Add Step</Button>
                    <Button
                    className=""
                    type="submit"
                    size="md"
                    color="primary"
                    onClick={() => this.save()}
                    style={{ marginLeft: '1.5rem' }}    
                    >{this.state.isNew ? "Create" : "Update"}</Button>
                </footer>
            </form>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return { ...state }
}

function mapDispatchToProps(dispatch) {
    return {
        createListener: bindActionCreators(createListener, dispatch),
        createSuite: bindActionCreators(createSuite, dispatch),
        getAllSuites: bindActionCreators(getAllSuites, dispatch),
        getSuite: bindActionCreators(getSuite, dispatch),
        logout: bindActionCreators(logout, dispatch),
        runCase: bindActionCreators(runCase, dispatch),
        scheduleRun: bindActionCreators(scheduleRun, dispatch),
        saveAndRun: bindActionCreators(saveAndRun, dispatch),
        updateSuite: bindActionCreators(updateSuite, dispatch),
        updateUser: bindActionCreators(updateUser, dispatch),
        fetchProjects: bindActionCreators(fetchProjects, dispatch),
        saveIssue: bindActionCreators(saveIssue, dispatch),
    };
}

const SingleCaseConnected = connect(mapStateToProps, mapDispatchToProps)(SingleCase);
export default SingleCaseConnected;
