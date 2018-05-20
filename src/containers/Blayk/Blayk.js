import React from 'react';

import { logout, updateUser } from '../../action_creators/auth';
import {
  createSuite,
  deleteSuite,
  getAllSuites,
  getSuite,
  runCase,
  scheduleRun,
  saveAndRun,
  updateSuite
} from '../../action_creators/test';
import { fetchProjects, saveIssue } from '../../action_creators/external'

import { createListener } from '../../listeners';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Authenticated from '../../routes_container/Authenticated/';
import Unauthenticated from '../../routes_container/Unauthenticated/';
import FlashMessage from './FlashMessage';

class App extends React.PureComponent {

  componentDidMount() {
    if (this.props.token && this.props.socket) this.props.createListener(
      String(this.props.user.id),
      this.props.socket
    );
  }

  redirectIfLoggedInAndVisitingUnAuthenticatedRoute() {
    if (
      this.props.token &&
      ['/login', '/register'].includes(this.props.location.pathname)
    ) this.props.history.replace("/tests")
  }

  routeByToken = () => this.props.token ? <Authenticated {...this.props} /> : <Unauthenticated />

  optionsByType(obj, type, defaultMessage) {
    return obj ?
      {
        message: obj.message || defaultMessage,
        type
      }
      : {}
  }

  flashOptions() {
    const { error, success } = this.props;
    return Object.assign(
      this.optionsByType(error, "error", "Error: Something went wrong"),
      this.optionsByType(success, "success", "Success!"),
    )
  }
  
  render() {
    this.redirectIfLoggedInAndVisitingUnAuthenticatedRoute();

    return <div>
      {this.routeByToken()}
      <FlashMessage
        flashOptions={this.flashOptions()}
      />
    </div>
  }
};

function mapStateToProps(state, ownProps) {
  return { ...state }
}

function mapDispatchToProps(dispatch) {
  return {
    createListener: bindActionCreators(createListener, dispatch),
    createSuite: bindActionCreators(createSuite, dispatch),
    deleteSuite: bindActionCreators(deleteSuite, dispatch),
    getAllSuites: bindActionCreators(getAllSuites, dispatch),
    getSuite: bindActionCreators(getSuite, dispatch),
    logout: bindActionCreators(logout, dispatch),
    runCase: bindActionCreators(runCase, dispatch),
    scheduleRun: bindActionCreators(scheduleRun, dispatch),
    saveAndRun: bindActionCreators(saveAndRun, dispatch),
    updateSuite: bindActionCreators(updateSuite, dispatch),
    updateUser: bindActionCreators(updateUser, dispatch),
    fetchProjects: bindActionCreators(fetchProjects, dispatch),
    saveIssue: bindActionCreators(saveIssue, dispatch),
  };
}

const Blayk = connect(mapStateToProps, mapDispatchToProps)(App);
export default Blayk;