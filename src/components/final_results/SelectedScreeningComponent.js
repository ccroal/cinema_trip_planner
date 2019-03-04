import React from 'react';

const SelectedScreeningComponent = (props) => {

  if(!props.selectedScreeningTime || !props.selectedCinema || !props.selectedCinemaAddress){
    return null;
  }

  return(
    <div>
    <h1>{props.selectedCinema.name}</h1>
    <p>{props.selectedCinemaAddress.address1}, {props.selectedCinemaAddress.towncity}, {props.selectedCinemaAddress.postcode}</p>
    <h1>{props.selectedScreeningTime}</h1>
    </div>
  )
  //display film title, cinema Name, cinema address

}

export default SelectedScreeningComponent;
