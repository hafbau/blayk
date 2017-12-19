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

import { ProfileTabs, ProfileHero } from '../../components';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSrc: this.props.user ? this.props.user.avatar : 'img/avatars/6.jpg',
            results: []
        };

        
    }

    componentDidMount() {
        if (this.state.case && !this.props.loading) {
            const { order, suite: { id } } = this.state.case;
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

    createIssue() {
        console.log("Im creating an issue")
    }

    updateIssue() {
        console.log("Im updating an issue")
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

    handleFileInput({ target: { files } }) {
        if (!files || !files.length) return false;
        console.log('file being handled', files)
        this.setState(prevState => Object.assign({}, prevState, { avatarSrc: files[0], editMode: true }))
    }

    render() {
        const caseToRun = this.state.case;
        const { avatarSrc, editMode, result, results, status } = this.state;
        const isRunning = this.props.loading// || (status !== "done" && status !== "failed");
        console.log("props in profile", this.props);
        console.log("state in profile", this.state);

        return (
            <div className="animated fadeIn">
                
                <Row>
                    <ProfileHero
                        avatarSrc={avatarSrc}
                        editMode={editMode}
                        handleFileInput={(e) => this.handleFileInput(e)}
                    />
                </Row>

                <Row>            
                    <ProfileTabs
                        image={result && result.image}
                        images={results && results.map(result => result.meta.imageDataUrl)}/>
                </Row>
            </div>
        )
    }
}

export default Profile;
