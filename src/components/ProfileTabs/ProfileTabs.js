import React from 'react';
import {
    Button,
    Card,
    CardBlock,
    CardTitle,
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Row,
} from 'reactstrap';

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
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

    render() {
console.log('props in tab', this.props)
        return (
            <div className="Profile-Tabs" style={{width: '100%'}}>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '1' ? "active" : ""}
                            onClick={() => this.toggle('1')}
                        >
                            Profile
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '2' ? "active" : ""}
                            onClick={() => this.toggle('2')}
                        >
                            Settings
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent
                    activeTab={this.state.activeTab}
                    className="Media-Panel-Tab-Content"
                >
                    <TabPane tabId="1" className="Media-Panel-Tab-Pane">
                        <Row>
                            <Col>
                                <Card className="borderless">
                                    <CardBlock>
                                        
                                    </CardBlock>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col>
                                <Card block>
                                    <CardTitle>Live Stream Video Coming Soon</CardTitle>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}