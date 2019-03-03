import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postcode: ''
    };
    this.handlePostcodeChange = this.handlePostcodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const postcode = this.state.postcode.trim();
    if (!postcode) {
      return
    }
    const regex = / /g;
    const amendedPostcode = postcode.replace(regex, '');
    this.props.onPostcodeSubmit( amendedPostcode )
  }
  
  handlePostcodeChange(event) {
    this.setState({ postcode: event.target.value });
  }

  render() {
    return (
      <form className="postcode-search" onSubmit={this.handleSubmit}>

      <label>
      Please enter your postcode:
      <input type="text" placeholder="Your postcode here..." value={this.state.postcode} onChange={this.handlePostcodeChange}/>
      </label>

      <input type="submit" value="View cinemas and films in your area" />
      </form>
    )
  }
}

export default Search;
