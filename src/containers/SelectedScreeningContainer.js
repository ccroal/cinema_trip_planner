import React, { Component } from 'react';
import SelectedScreeningComponent from '../components/final_results/SelectedScreeningComponent.js';

class SelectedScreeningContainer extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return (
      <div>
        <SelectedScreeningComponent selectedScreeningTime={this.props.selectedScreening}/>
      </div>
    )
  }
}

export default SelectedScreeningContainer;
