import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
//import { Router } from 'express';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Route exact path= "/" component={Landing} /> 
      <Footer />
    </div>
    </Router>
  );
}

export default App;
