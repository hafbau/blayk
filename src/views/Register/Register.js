import React, {Component} from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBlock,
  CardGroup,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { form: {} };
  }

  handleChange({ target: { name, value } }) {
    const form = this.state.form;
    form[name] = value;
    this.setState({ form });
    return false;
  }

  handleRegister(e) {
    // TODO: validate form before sending
    this.props.register(this.state.form);
    return false;
  }
  render() {
    if (this.props.token) return <Redirect to="/tests/new" />
    
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-0">
                <Card className="p-4">
                  <CardBlock className="card-body">
                    <h1>Register</h1>
                    <p className="text-muted">Create a new account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                      <Input onChange={(e) => this.handleChange(e)} name="firstName" type="text" placeholder="First Name" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                      <Input onChange={(e) => this.handleChange(e)} name="lastName" type="text" placeholder="Last Name" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon>@</InputGroupAddon>
                      <Input onChange={(e) => this.handleChange(e)} name="email" type="text" placeholder="Email" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input onChange={(e) => this.handleChange(e)} name="password" type="password" placeholder="Password" />
                    </InputGroup>
                    
                    <Row>
                      <Col xs="6">
                        <Button onClick={(e) => this.handleRegister(e)} color="primary" className="px-4">Create Account</Button>
                      </Col>
                    </Row>
                  </CardBlock>
                  
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBlock className="card-body text-center">
                    <div>
                      <h2>Log In</h2>
                      <p>Already has an account here?</p>
                      <Button
                        active
                        className="mt-3"
                        color="primary"
                        tag={Link}
                        to="/login"
                      >Login</Button>
                    </div>
                  </CardBlock>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
