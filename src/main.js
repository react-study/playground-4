import React from 'react';
import ReactDOM from 'react-dom';
import ReduxMain from './reduxExample/ReduxMain';

ReactDOM.render(
    <ReduxMain/>,
    document.getElementById('root')
);

/*
//원래는 이렇게 들어오면 됩니다.
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
 */
