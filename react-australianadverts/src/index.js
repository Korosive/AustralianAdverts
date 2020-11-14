import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import CreateAdvert from './components/CreateAdvert';
import reportWebVitals from './reportWebVitals';

const routing = (
	<Router>
		<Navigation />
		<Switch>
			<Route exact strict path="/" component={Home} />
			<Route exact strict path="/login" component={Login} />
			<Route exact strict path="/create-account" component={CreateAccount} />
			<Route exact strict path="/create-advert" component={CreateAdvert} />
		</Switch>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
