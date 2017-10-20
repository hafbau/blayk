import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../../views/Login/';
import Register from '../../containers/RegisterContainer/';

function UnauthenticatedRoutes(props) {
    return (
  
      <Switch>

        <Route exact path="/register" name="Register Page" component={Register} />
        <Route path="/" name="Login Page" component={Login} />

      </Switch>
            
    );
};

export default UnauthenticatedRoutes;