import React from 'react';
import Login from './pages/Login/Login';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Main = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/' exact render={() => <Redirect to="/login" />} />
            </Switch>
        </BrowserRouter>
    );
};

export default Main;