import React, { Component } from 'react';

import { logout } from '../../action_creators/auth';
import { saveAndRun } from '../../action_creators/test';

import { createListener } from '../../listeners';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Authenticated from '../../routes_container/Authenticated/';
import Unauthenticated from '../../routes_container/Unauthenticated/';

class App extends Component {

  componentDidMount() {
    console.log("will mount", this.props)
    if (this.props.token) this.props.createListener(String(this.props.user.id), this.props.socket);
  }

  render() {
    // console.log("props in blayk", this.props)
    if (!this.props.token) return <Unauthenticated />
    return <Authenticated {...this.props} />
  }
};

function mapStateToProps(state, ownProps) {
  return { ...state }
}

function mapDispatchToProps(dispatch) {
  return {
    createListener: bindActionCreators(createListener, dispatch),
    logout: bindActionCreators(logout, dispatch),
    saveAndRun: bindActionCreators(saveAndRun, dispatch),
  };
}

const Blayk = connect(mapStateToProps, mapDispatchToProps)(App);
export default Blayk;