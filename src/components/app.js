import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home/home';


class App extends Component {
  render() {
    return (
     <Home />
    );
  }
}


export default App;
