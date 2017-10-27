import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container } from 'reactstrap';

import CreateTest from '../../views/CreateTest';
import Header from '../../components/Header/';
import AllTests from '../../views/AllTests/';
import SingleSuite from '../../views/SingleSuite/';
import SingleCase from '../../views/SingleCase/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';

import Page404 from '../../views/Page404/';

function AuthenticatedRoutes(props) {
    return (
      <div className="app">
        <Header {...props}/> 
        <div className="app-body">
            <Sidebar {...props}/>  
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>

                <Route path="/new" name="Create Test" render={() => <CreateTest {...props} />} /> 
                <Route name="All Tests" exact path="/tests" render={() => <AllTests {...props} />} />
                <Route name="View Suite" exact path="/tests/:id" render={() => <SingleSuite {...props} />} />
                <Route name="View Test Case" exact path="/tests/:suiteId/cases/:id" render={() => <SingleCase {...props} />} />
                
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