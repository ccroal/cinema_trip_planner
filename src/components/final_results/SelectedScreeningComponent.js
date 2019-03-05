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
    <h1>{props.finalObject.screeningTime}</h1>
    <h1>{props.finalObject.cinemaDetails.name}</h1>
    <h1>{amendedAddress}, {props.finalObject.cinemaDetails.postcode}</h1>
    <a href={props.finalObject.cinemaDetails.website}>Book your tickets here</a>
    </div>


  )
  //display film title, cinema Name, cinema address

}

export default SelectedScreeningComponent;
