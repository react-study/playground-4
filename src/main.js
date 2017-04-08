import React from 'react';
import ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
//import RouterMain from './routerExample/routerMain';
import App from './App';

ReactDom.render(
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/:filterName" component={App} />
        </Switch>
    </Router>,
    document.getElementById('root')
)
