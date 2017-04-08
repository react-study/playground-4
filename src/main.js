import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import App from './App';
//import RouterMain from './routerExample/routerMain';
//import App from './reduxExample/App';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/:filterName" component={App}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);

