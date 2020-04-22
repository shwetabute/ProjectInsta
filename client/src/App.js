import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch  } from 'react-router-dom';
//import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.scss';

import CreateProfile from './components/create-profile/CreateProfile';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import RstPswd from './components/auth/Password';
import setAuthToken from './utils/setAuthToken';
import { SET_CURRENT_USER } from './actions/types';
import jwt_decode from 'jwt-decode';
import { logoutUser } from './actions/authActions'

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
          <Route
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
          <Route exact path="/reset" component={RstPswd} />
        
        </div>
        <Footer/>
      </Router>
     
                
              
    </Provider>
    );
  }
}

export default App;
