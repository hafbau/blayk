import React from 'react';
import {
    Card,
    CardBlock,
    Col,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";

export default (props) => {
    const step = props.step;
    const { options, order, target, type } = step;
    return <li className="test">
        <Card>
            <CardBlock className={`card-body`}>
                <div className="left" >
                    {/* <i className="fa fa-stop-circle-o" aria-hidden="true"></i>
                    <span className="test-name">Step {order}</span> */}
                    <Row>
                        <Col xs="3">
                            <FormGroup>
                                <Label htmlFor={`action-${order}`}>Action</Label>
                                <Input
                                    onChange={(e) => props.handleChange(e)} name={`steps.${order - 1}.type`} type="select" id={`action-${order}`} defaultValue={type}
                                    required
                                >
                                    <option value="">Select an action</option>
                                    <option value="click">Click</option>
                                    <option value="get">Go to</option>
                                    <option value="sendKeys">Fill value</option>
                                    <option value="textContains">Text Contains</option>
                                    <option value="textNotContains">Text does not Contain</option>
                                </Input >
                            </FormGroup>
                        </Col>
                        <Col xs="3">
                            <FormGroup>
                                <Label htmlFor={`value-${order}`}>Value</Label>
                                <Input
                                    onBlur={(e) => props.handleChange(e)}
                                    name={`steps.${order - 1}.options.value`} type="text" id={`value-${order}`}
                                    placeholder="Enter value here"
                                    defaultValue={options.value}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="3">
                            <FormGroup>
                                <Label htmlFor={`target-value-${order}`}>Target</Label>
                                <Input
                                    onBlur={(e) => props.handleChange(e)}
                                    name={`steps.${order - 1}.target.value`}
                                    type="text" id={`target-value-${order}`}
                                    placeholder="Enter target element here"
                                    defaultValue={target.value}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="3">
                            <FormGroup>
                                <Label htmlFor={`target-type-${order}`}>Selection Method</Label>
                                <Input
                                    onChange={(e) => props.handleChange(e)}
                                    name={`steps.${order - 1}.target.type`}
                                    type="select"
                                    id={`target-type-${order}`}
                                    placeholder="Select target location method"
                                    defaultValue={target.type}
                                    required >
                                    <option value="default">Default</option>
                                    <option value="css">CSS</option>
                                    <option value="text">Text</option>
                                    <option value="xpath">Xpath</option>
                                    <option value="linkText">Link Text</option>
                                </Input >
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div className='right'>
                    <i className="fa fa-clone" aria-hidden="true" onClick={() => props.duplicateStep(step)}></i>
                    <i className="fa fa-arrow-up" aria-hidden="true" onClick={() => props.move(step.order, -1)}></i>
                    <i className="fa fa-arrow-down" aria-hidden="true" onClick={() => props.move(step.order, 1)}></i>
                    <i className="fa fa-trash" aria-hidden="true" onClick={() => props.deleteStep(step.order)}></i>
                </div>
            </CardBlock>
        </Card>
    </li>
}