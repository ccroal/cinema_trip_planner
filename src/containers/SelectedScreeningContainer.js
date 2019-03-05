import React, { Component } from 'react';
import SelectedScreeningComponent from '../components/final_results/SelectedScreeningComponent.js';

import Request from '../helpers/request.js'

class SelectedScreeningContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      routeObject: null
    }
  }

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
