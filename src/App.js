import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from "./pages/Login"
import './App.css';

function App() {
  return(
  <Router>
    <div>
      <Route path='/' exact component={Login} />
    </div>
  </Router>
  )
}

export default App;
