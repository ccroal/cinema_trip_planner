import React from 'react';

const SelectedScreeningComponent = (props) => {

  if(!props.finalObject){
    return null;
  }

  const address = props.finalObject.cinemaDetails.address1;
  const regex = /<br \/> /g;
  const amendedAddress = address.replace(regex, '');



  return(
    <div className="selected-screening-component-div">
    <h1>{props.finalObject.filmTitle}</h1>
    <h2>{props.finalObject.screeningTime}</h2>
    <h2>{props.finalObject.cinemaDetails.name}</h2>
    <h2>{amendedAddress}, {props.finalObject.cinemaDetails.postcode}</h2>
    <a href={props.finalObject.cinemaDetails.website} target="blank">Book your tickets here</a>
    </div>


  )

}

export default SelectedScreeningComponent;
