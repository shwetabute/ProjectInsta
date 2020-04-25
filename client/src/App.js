import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
//import { Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser } from './actions/authActions'

// import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';
import './App.scss';
import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import EditProfile from './components/edit-profile/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';
import RstPwd from './components/auth/Password';
import { SET_CURRENT_USER } from './actions/types';



if (localStorage.jwtToken) {
  //decode
  const decoded = jwt_decode(localStorage.jwtToken);
  //check for expiry of the token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //LogOut the user 
    store.dispatch(logoutUser());
    //Redirect the user to login page
    window.location.href = '/login';
  }

  //set auth header
  setAuthToken(localStorage.jwtToken);
  
  //dispatch call
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
}

//function App(){
class App extends Component {
  render() {
    return (
    <Provider store={store}> 
      <Router>
        
        <div className="App">
        <Navbar/>
          <Route exact path="/" component={Landing} /> 
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/reset" component={RstPwd} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
            </Switch>
            <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
                   

        </div>
        <Footer/>
      </Router>
     
                
              
    </Provider>
    );
  }
}

export default App;
