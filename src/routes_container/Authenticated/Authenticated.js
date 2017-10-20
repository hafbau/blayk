import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container } from 'reactstrap';

import CreateTest from '../../views/CreateTest';
import Header from '../../components/Header/';
import RunTest from '../../views/RunTest/';
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
                <Route path="/tests" name="Run Test" render={() => <RunTest {...props} />} />
                <Route exact path="/" name="Home" render={() => <CreateTest {...props} />}/>
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