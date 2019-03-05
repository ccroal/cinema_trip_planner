import React, { Component } from 'react';
import SelectedScreeningComponent from '../components/final_results/SelectedScreeningComponent.js';
import Config from '../config.js'

class SelectedScreeningContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      routeObject: null
    }
  }


  getTransportRoute(startPostCode, endPostCode){
    const request = new Request();
    const url = `https://transportapi.com/v3/uk/public/journey/from/postcode:${startPostCode}/to/postcode:${endPostCode}.json?app_id=${Config.appId}&app_key=${Config.apiKey}&service=southeast`
    request.get(url).then((data) => {
      this.setState({routeObject: data})
    })
  }

// this.getTransportRoute(this.props.searchedPostcode, this.props.selectedFinalObject.cinemaDetails.postcode)

  render(){
    if(!this.props.selectedFinalObject){
      return null
    }

    return (
      <div>
        <SelectedScreeningComponent finalObject={this.props.selectedFinalObject} routeObject={this.state.routeObject}/>
      </div>
    )
  }
}

export default SelectedScreeningContainer;
