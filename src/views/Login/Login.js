import React from "react";
import { Link, Redirect } from "react-router-dom";

// Making the container here. If it gets more complicated, move out of here
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../action_creators/auth';

import {
  Button,
  Card,
  CardBlock,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Row
} from "reactstrap";


function Login(props) {
  if (props.token) return <Redirect to="/" />
  
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup className="mb-0">
              <Card className="p-4">
                <CardBlock className="card-body">
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <Form onSubmit={(e) => handleSubmit(e, props.login)}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                      <Input name="email" type="email" placeholder="Email" autoFocus/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input name="password" type="password" placeholder="Password"/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button tag={Link} to="/register" color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBlock>
              </Card>
              <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                <CardBlock className="card-body text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Blayk tests all the things.</p>
                    <Button
                      active
                      className="mt-3"
                      color="primary"
                      tag={Link}
                      to="/register"
                    >Register Now!</Button>
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


// helpers
function handleSubmit(e, login) {
  e.preventDefault();
  const form = extractFormValues(e.target);
  login(form);
}

function extractFormValues({ elements }) {
  const formValues = {};
  if (elements && elements.length) {
    for (let i = 0; i < elements.length; i++) {
      const field = elements[i];
      const fieldName = field.getAttribute('name');
      if (fieldName) formValues[fieldName] = field.value;
    }
  }
  return formValues;
};

// connecting to store business
function mapStateToProps(state, ownProps) {
  console.log("state in login", state)

  return { token: state.token }
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
  };
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;
