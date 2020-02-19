import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import App from './App';
import booksReducer from './redux/reducer';
import './style.css';

const store = createStore(booksReducer, applyMiddleware(thunkMiddleware));

render(<Router><Provider store={store}><App /></Provider></Router>, document.getElementById('root'));
