import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBlock,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

import { set } from '../../utils/resolve_object_path';

export default class Step1 extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {}

    handleBlur({ target: { name, value } }) {
        const form = this.props.getForm();

        this.props.updateForm(
            set(form, name, value)
        );
        return false;
    }

    render() {
        let tabIndex = 1
        return (
            <div className="animated fadeIn">

                <Row>
                    <Col>
                        <Card>
                            
                            <CardBlock className="card-body">
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                   
                                    <FormGroup>
                                        <Label htmlFor="case">Test Suite Name</Label>
                                        <Input
                                            onBlur={(e) => this.handleBlur(e)}
                                            name="title"
                                            type="text"
                                            defaultValue={this.props.getForm().title}
                                            id="suite" placeholder="Enter test suite name"
                                            tabIndex={tabIndex++}
                                            autoFocus
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="case">Test Case Name</Label>
                                        <Input
                                            onBlur={(e) => this.handleBlur(e)}
                                            name="cases.0.title"
                                            type="text"
                                            id="case"
                                            defaultValue={this.props.getForm().cases[0].title}
                                            placeholder="Enter first test case name"
                                            tabIndex={tabIndex++}                                            
                                        />
                                    </FormGroup>

                                </Form>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}