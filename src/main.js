import React from 'react';
import ReactDOM from 'react-dom';
import ReduxMain from './reduxExample/ReduxMain';

ReactDOM.render(
    <ReduxMain/>,
    document.getElementById('root')
);

/* 원래 이케 이케 */
/*
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Proider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root');
);
*/
