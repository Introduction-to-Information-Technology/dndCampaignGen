import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Navbar/navbar';
import Home from './home/home';


class App extends Component {
  render() {
    return (
      <Router>
          <Navbar />
            <Route exact path="/" component={Home} />

      </Router>
    );
  }
}


export default App;
