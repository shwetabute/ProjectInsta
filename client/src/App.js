import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import store from './store';
//import { Router } from 'express';

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Navbar />
      <Route exact path= "/" component={Landing} /> 
      <Route exact path= "/register" component={Register} />
      <Footer />
    </div>
    </Router>
    </Provider>
  );
}

export default App;
