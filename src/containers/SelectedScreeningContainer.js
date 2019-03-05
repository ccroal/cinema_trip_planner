import React, { Component } from 'react';
import SelectedScreeningComponent from '../components/final_results/SelectedScreeningComponent.js';
import TransportComponent from '../components/final_results/TransportComponent.js'

import Request from '../helpers/request.js'

class SelectedScreeningContainer extends Component {

  constructor(props){
    super(props);
  }

  render(){
    if(!this.props.routeObject){
      return null
    }

    return (
      <div>
        <SelectedScreeningComponent finalObject={this.props.selectedFinalObject}/>
        <TransportComponent routeObject={this.props.routeObject} />
      </div>
    )
  }
}

export default SelectedScreeningContainer;
