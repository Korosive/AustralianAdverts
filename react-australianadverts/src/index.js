import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import UserProfile from './components/UserProfile';
import DeleteAdvert from './components/DeleteAdvert';
import CreateAdvert from './components/CreateAdvert';
import UpdateUser from './components/UpdateUser';
import ProfileAdverts from './components/ProfileAdverts';
import Advert from './components/Advert';
import UpdateAdvert from './components/UpdateAdvert';
import DeleteUser from './components/DeleteUser';
import PayAdvert from './components/PayAdvert';
import Logout from './components/Logout';

import reportWebVitals from './reportWebVitals';

const routing = (
	<BrowserRouter>
		<Navigation />
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route path="/create/user" component={CreateUser} />
			<Route path="/profile/:user_id" component={UserProfile} />
			<Route path="/delete/advert/:advert_id" component={DeleteAdvert} />
			<Route path="/delete/user/:user_id" component={DeleteUser} />
			<Route path="/create/advert" component={CreateAdvert} />
			<Route path="/profile/adverts/:user_id" component={ProfileAdverts} />
			<Route path="/adverts/:advert_id" component={Advert}/>
			<Route path="/update/advert/:advert_id" component={UpdateAdvert} />
			<Route path="/update/user/:user_id" component{UpdateUser} />
			<Route path="/pay/:advert_id" component={PayAdvert} />
			<Route path="/logout" component={Logout} />
		</Switch>
	</BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
