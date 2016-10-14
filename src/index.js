import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import App from './containers/App';
import reducer from './reducers';
import 'antd/dist/antd.css';
import './index.less';

const store = createStore(reducer, applyMiddleware(...[thunk]));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);