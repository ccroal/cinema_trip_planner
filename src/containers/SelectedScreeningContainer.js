import React, { Component } from 'react';
import SelectedScreeningComponent from '../components/final_results/SelectedScreeningComponent.js';

const SelectedScreeningContainer = (props) => {

  if(!props.selectedFinalObject){
    return null;
  }

  return (
    <div>
      <SelectedScreeningComponent finalObject={props.selectedFinalObject}/>
    </div>
  )
}

export default SelectedScreeningContainer;
