import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import sessionManager from './helpers/sessionManager';
import './assets/css/App.css';
import { config } from './config/config';

export const userData = sessionManager.getUserData();

axios.defaults.baseURL = config.requestURL;

if(userData != null) {
    const token = `${config.authType}${userData.meta.token}`;
    axios.defaults.headers.common['Authorization'] = token;
}

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
