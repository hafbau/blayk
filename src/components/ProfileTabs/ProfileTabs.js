import React from 'react';
import {
    Button,
    Card,
    CardBlock,
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Row,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';

import SectionTitle from './SectionTitle';

export default class ProfileTabs extends React.Component {
    constructor(props) {
        super(props);
        const tab = (this.props.location && this.props.location.state && this.props.location.state.tab) || this.props.tab
        this.state = {
            activeTab: tab || '1',
            showPassword: false
        };
    }

    toggle(activeTab) {
        if (this.state.activeTab !== activeTab) {
            this.setState((state, props) => Object.assign({},
                state,
                { activeTab })
            );
        }
    }

    handleBlur(e) {
        const updateForm = this.props.updateForm;
        if (typeof updateForm === 'function') updateForm(e)
        return false;
    }
    
    render() {
        let tabIndex = 1;
        const { activeTab, showPassword } = this.state;
        const { getForm = () => ({}), submitForm = () => null } = this.props;        
        return (
            <div className="Profile-Tabs" style={{width: '100%'}}>
                <Nav tabs>
                    <NavItem style={{ cursor: 'pointer' }}>
                        <NavLink
                            className={this.state.activeTab === '1' ? "active" : ""}
                            onClick={() => this.toggle('1')}
                        >
                            Profile
                        </NavLink>
                    </NavItem>
                    <NavItem style={{ cursor: 'pointer' }}>
                        <NavLink
                            className={this.state.activeTab === '2' ? "active" : ""}
                            onClick={() => this.toggle('2')}
                        >
                            Settings
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent
                    activeTab={activeTab}
                    className="Media-Panel-Tab-Content"
                >
                    <TabPane tabId="1" className="Profile-Panel-Tab-Pane">
                        <Row>
                            <Col>
                                <Card className="borderless">
                                    <CardBlock>
                                        <SectionTitle>Basic Info</SectionTitle>

                                        <FormGroup>
                                            <Input
                                                onBlur={(e) => this.handleBlur(e)}
                                                name="firstName"
                                                id="firstName"
                                                type="text"
                                                defaultValue={getForm().firstName}
                                                placeholder="First name"
                                                tabIndex={tabIndex++}
                                                autoFocus
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                onBlur={(e) => this.handleBlur(e)}
                                                name="lastName"
                                                type="text"
                                                id="lastName"
                                                defaultValue={getForm().lastName}
                                                placeholder="Last name"
                                                tabIndex={tabIndex++}
                                            />
                                        </FormGroup>
                                        {/* <FormGroup>
                                            <Input
                                                onBlur={(e) => this.handleBlur(e)}
                                                name="email"
                                                type="email"
                                                id="email"
                                                defaultValue={getForm().email}
                                                placeholder="Email"
                                                tabIndex={tabIndex++}
                                            />
                                        </FormGroup> */}

                                        <Button
                                            color="primary"
                                            onClick={(e) => submitForm()}
                                        >Update</Button>

                                    </CardBlock>
                                </Card>
                            </Col>
                        </Row>
                        
                    </TabPane>
                    <TabPane tabId="2" className="Profile-Panel-Tab-Pane">
                        <Row>
                            <Col>
                                <Card className="borderless">
                                    <CardBlock>
                                        <SectionTitle>Integrations</SectionTitle>
                                        <FormGroup>
                                            <Label>Slack Webhook</Label>
                                            <Input
                                                onBlur={(e) => this.handleBlur(e)}
                                                name="slack"
                                                type="text"
                                                defaultValue={getForm().slack}
                                                id="slack" placeholder="https://slack.integration.webhook..."
                                                tabIndex={tabIndex++}
                                                autoFocus
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Jira Webhook</Label>
                                            <Row>
                                                <Col xs="4">
                                                    <Label>API Endpoint</Label>        
                                                    <Input
                                                        onBlur={(e) => this.handleBlur(e)}
                                                        name="jiraURL"
                                                        type="text"
                                                        id="jiraURL"
                                                        defaultValue={getForm().jiraURL}
                                                        placeholder="https://jiraInstanceUrl..."
                                                        tabIndex={tabIndex++}
                                                    />
                                                </Col>
                                                <Col xs="4">
                                                    <Label>JIRA Username / Email</Label>        
                                                    <Input
                                                        onBlur={(e) => this.handleBlur(e)}
                                                        name="jiraUsername"
                                                        type="text"
                                                        id="jiraUsername"
                                                        defaultValue={getForm().jiraUsername}
                                                        placeholder="JIRA username"
                                                        tabIndex={tabIndex++}
                                                    />
                                                </Col>
                                                <Col xs="4">
                                                    <Label>JIRA Password</Label>
                                                    <InputGroup>
                                                        <Input
                                                            onBlur={(e) => this.handleBlur(e)}
                                                            name="jiraPassword"
                                                            type={showPassword ? 'text' : 'password'}
                                                            id="jiraPassword"
                                                            defaultValue={getForm().jiraPassword}
                                                            placeholder="JIRA Password"
                                                            tabIndex={tabIndex++}
                                                        />
                                                        <InputGroupAddon>
                                                            <i
                                                                className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                                                onClick={e => this.setState({ showPassword: !showPassword })}
                                                                aria-hidden="true"></i>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Pipeline Hook</Label>
                                            <Input
                                                onBlur={(e) => this.handleBlur(e)}
                                                name="pipeline"
                                                type="text"
                                                id="pipeline"
                                                defaultValue={getForm().pipeline}
                                                placeholder="Pipeline hook"
                                                tabIndex={tabIndex++}
                                            />
                                        </FormGroup>

                                        <Button
                                            color="primary"
                                            onClick={(e) => submitForm()}
                                        >Update</Button>

                                    </CardBlock>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}