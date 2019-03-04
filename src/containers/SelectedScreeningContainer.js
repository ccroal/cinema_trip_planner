import React, { Component } from 'react';
import SelectedScreeningComponent from '../components/final_results/SelectedScreeningComponent.js';

const SelectedScreeningContainer = (props) => {

  if(!props.selectedCinema || !props.selectedCinemaAddress || !props.selectedScreening){
    return null;
  }

  return (
    <div>
      <SelectedScreeningComponent selectedScreeningTime={props.selectedScreening} selectedCinema={props.selectedCinema} selectedCinemaAddress={props.selectedCinemaAddress} />
    </div>
  )
}

export default SelectedScreeningContainer;
