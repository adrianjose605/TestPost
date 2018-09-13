import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TablePost from './components/TablePost'
import NavBar from './components/NavBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
       
        <p className="App-intro">
          
        </p>
        <TablePost/>
      </div>
    );
  }
}

export default App;
/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>*/