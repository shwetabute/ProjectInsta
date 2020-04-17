import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from './store';
import { Component } from "react";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from "./action/types";


if (localStorage.jwtToken) {
   //decode the token
   const decoded=jwt_decode(localStorage.jwtToken)

  //check for expiry of token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //LogOut the user 
    store.dispatch(logoutUser());
    //redirect the user to login page 
    window.location.href='/'
  }

  //set auth header
   setAuthToken(localStorage.jwtToken)
 
  //set dispatch call
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  })
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
