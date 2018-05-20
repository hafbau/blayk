import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import AllTests from '../../views/AllTests/';
import Breadcrumb from '../../components/Breadcrumb/';
import CreateTest from '../../views/CreateTest';

import Footer from '../../components/Footer/';
import Header from '../../components/Header/';
import RunTest from '../../views/RunTest/';

import SingleCase from '../../views/SingleCase/';
import SingleSuite from '../../views/SingleSuite/';

import Profile from '../../views/Profile/';
import Page404 from '../../views/Page404/';

function AuthenticatedRoutes(props) {
    return (
      <div className="app">
        <Header {...props}/> 
        <div className="app-body">
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>

                <Route path="/profile" name="Profile" render={() => <Profile {...props} />} />

                <Route name="All Tests" exact path="/tests" render={() => <AllTests {...props} />} />

                <Route name="Run Test Case" exact path="/tests/:suiteId/cases/:id/run" render={() => <RunTest {...props} />} />
                <Route name="View" exact path="/tests/:suiteId/cases/:id" component={SingleCase} />
                <Route name="View" exact path="/tests/new" component={SingleCase} />

                
                <Route exact path="/" name="Home" render={() => <AllTests {...props} />}/>
                <Route render={() => <Page404 {...props} />}/>

              </Switch>
            </Container>
          </main>
        </div>
        <Footer />
      </div>
    );
};

export default AuthenticatedRoutes;