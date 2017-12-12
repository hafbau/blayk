import React, { Component } from 'react';

import { logout } from '../../action_creators/auth';
import {
  createSuite,
  getAllSuites,
  getSuite,
  runCase,
  saveAndRun,
  updateSuite
} from '../../action_creators/test';

import { createListener } from '../../listeners';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Authenticated from '../../routes_container/Authenticated/';
import Unauthenticated from '../../routes_container/Unauthenticated/';

class App extends Component {

  componentDidMount() {
    if (this.props.token && this.props.socket) this.props.createListener(String(this.props.user.id), this.props.socket);
  }
  
  render() {
    console.log("props in blayk", this.props)
    if (this.props.token) {
      if (['/login', '/register'].includes(this.props.location.pathname)) this.props.history.replace("/tests")
      return <Authenticated {...this.props} />
    }
    return <Unauthenticated />
  }
};

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
    saveAndRun: bindActionCreators(saveAndRun, dispatch),
    updateSuite: bindActionCreators(updateSuite, dispatch),
  };
}

const Blayk = connect(mapStateToProps, mapDispatchToProps)(App);
export default Blayk;