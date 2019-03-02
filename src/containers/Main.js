import React, {Component} from 'react';
import Search from '../components/main/Search.js';
import MainHeader from '../components/main/MainHeader.js';

class MainContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      postcodeSearch: '',
    }
    this.handlePostcodeInput = this.handlePostcodeInput.bind(this);
  }

  handlePostcodeInput(postcode) {
    this.setState({ postcodeSearch: postcode });
  }

  render() {
    return (
      <div>
        <MainHeader title="This is our app!" />
        <Search onPostcodeSubmit={this.handlePostcodeInput}/>
      </div>
    );
  }
}

export default MainContainer;
