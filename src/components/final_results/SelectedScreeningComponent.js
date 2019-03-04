import React from 'react';

const SelectedScreeningComponent = (props) => {

  if(!props.finalObject){
    return null;
  }

  return(
    <div>
    <h1>{props.finalObject.filmTitle}</h1>
    </div>
  )
  //display film title, cinema Name, cinema address

}

export default SelectedScreeningComponent;
