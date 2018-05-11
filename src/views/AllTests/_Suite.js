import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardBlock
} from "reactstrap";

import Case from '../SingleSuite/_Case';
import cuid from 'cuid';
import deepClone from '../../utils/deep_clone';
import { get, set } from '../../utils/resolve_object_path';

class Suite extends PureComponent {
    constructor(props) {
        super(props);
        const suite = Object.assign({},
            props.suite,
            {
                meta: {
                    slack: this.props.user && this.props.user.slack,
                    jiraURL: this.props.user && this.props.user.jiraURL,
                    jiraUsername: this.props.user && this.props.user.jiraUsername,
                    jiraPassword: this.props.user && this.props.user.jiraPassword,
                    pipeline: this.props.user && this.props.user.pipeline,
                }
            }
        )
        this.state = {
            showDetails: false,
            suite, // TODO: fallback to go fetch it (componentWillMount) if not in location state e.g. when entered to the address bar directly
            hasIssueService: !!(suite.meta.jiraURL && suite.meta.jiraUsername && suite.meta.jiraPassword)
        }
    }
    componentWillReceiveProps({ suite }, nextState) {
        this.setState(prevState => Object.assign({}, prevState, { suite }));
    }
    deleteTestCase(order) {
        const suite = deepClone(this.state.suite);
        const newTestCases = suite.cases
            .filter(s => s.order !== order)
            .map(s => s.order > order ? s.order-- && s : s);

        suite.cases = newTestCases;
        this.props.updateSuite(suite);
        // this.setState(prevState => Object.assign({}, prevState, { suite }));
        return false;
    }

    duplicateTestCase(testCase) {
        const suite = deepClone(this.state.suite);
        const newTestCase = Object.assign({}, deepClone(testCase), { order: suite.cases.length + 1 });

        delete newTestCase.lastRun;
        delete newTestCase.isPassing;
        delete newTestCase.lastPassed;

        newTestCase.title = newTestCase.title + 'copy';
        newTestCase.createdAt = Date.now();
        newTestCase.meta = {};

        newTestCase.steps = newTestCase.steps.map(step => {
            const { order, category, options, target, type } = step;
            return { order, category, options, target, type };
        });

        suite.cases.push(newTestCase)
        this.props.updateSuite(suite);
        // this.setState(prevState => Object.assign({}, prevState, { suite }));
        return false;
    }

    handleChange({ target: { name, value } }) {
        const suite = set(deepClone(this.state.suite), name, value);
        this.setState(prevState => Object.assign({}, prevState, { suite }));
        return false;
    }

    move(order, increment) {
        const suite = deepClone(this.state.suite);
        const index = suite.cases.findIndex(testCase => testCase.order === order);

        if (index + increment > -1 && index + increment < suite.cases.length) {
            const testCaseToMove = suite.cases.splice(index, 1)[0];
            suite.cases.splice(index + increment, 0, testCaseToMove)

            suite.cases = suite.cases.map((testCase, i) => {
                testCase.order = i + 1;
                return testCase;
            });
        }
        this.setState(prevState => Object.assign({}, prevState, { suite }));
        return false;
    }

    update() {
        if (typeof this.props.updateCase === 'function') this.props.updateCase(this.state.suite);
        return false
    }

    toggleDetails() {
        this.setState({ showDetails: !this.state.showDetails })
    }
    render() {
        const { runSuite, duplicateSuite, deleteSuite } = this.props;
        const { hasIssueService, suite } = this.state;
        console.log('props in _Suite', this.props);
        return <li className="test">
            <Card>
                <CardBlock className={`card-body`}>
                    <Link className="left" to="#_" onClick={() => this.toggleDetails()}>
                        <i className="fa fa-suitcase" aria-hidden="true"></i>
                        <span className="test-name">{suite.title}</span>
                    </Link>
                    <div className='right'>
                        <i className="fa fa-play" aria-hidden="true" onClick={() => runSuite()}></i>
                        <i className="fa fa-clone" aria-hidden="true" onClick={() => duplicateSuite(suite)}></i>
                        <i className="fa fa-trash" aria-hidden="true" onClick={() => deleteSuite(suite)}></i>
                    </div>
                </CardBlock>
                {<div className="content-drawer" style={{ display: this.state.showDetails ? "block" : "none" }}>
                    <div className="content-drawer-head">
                        <Link className="left" to={`/tests/${suite._id}/cases/new`}>
                            <Button>+ Add</Button>
                        </Link>
                    </div>

                    <div className="content-drawer-body">
                        {get(suite, "cases", []).map(testCase => <Case
                                deleteTestCase={(step) => this.deleteTestCase(step)}
                                duplicateTestCase ={(step) => this.duplicateTestCase (step)}
                                handleChange={(e) => this.handleChange(e)}
                                key={cuid()}
                                move={(order, increment) => this.move(order, increment)}
                                runTestCase={(suiteId, order) => this.props.runCase(suiteId, order)}
                                scheduleRun={(args) => this.props.scheduleRun(args)}
                                suiteId={suite._id}
                                testCase={testCase}
                                hasIssueService={hasIssueService}
                            />)}
                    </div>
                </div>}
            </Card>
        </li>
    }
}

export default Suite;