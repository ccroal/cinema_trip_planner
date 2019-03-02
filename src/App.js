import React, { Component } from 'react';
import Search from './components/main/Search.js';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postcode: ''
    };
    this.handlePostcodeInput = this.handlePostcodeInput.bind(this);
  }

  handlePostcodeInput(postcode) {
    console.log('Entered postcode:', postcode);
  }

  render() {
    return (
      <div>
        <h1>This is our app</h1>
        <Search onPostcodeSubmit={this.handlePostcodeInput}/>
      </div>
    );
  }


}

export default App;
