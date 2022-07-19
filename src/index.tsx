import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>,
);