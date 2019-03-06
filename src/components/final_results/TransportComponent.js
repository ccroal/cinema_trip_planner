import React from 'react';

const TransportComponent = (props) => {


  function displayRoute(){
    const route = props.routeObject.routes.shift()
     return(
       <div className="route-div">
        <p>Duration: {route.duration}</p>
        {routeParts(route)}
       </div>
      )
  }

  function routeParts(route){
    const routeParts = route.route_parts.map((routepart, index) => {
      return(
        <div className="route-part-div">
          <p>journey Part: {index + 1}</p>
          <p>Mode: {routepart.mode} {routepart.line_name} </p>
          <p>From: {routepart.from_point_name}</p>
          <p>To: {routepart.to_point_name}</p>
          <p>Duration: {routepart.duration}</p>
        </div>
      )
    })
    return routeParts
  }

  return(
    <div className="transport-component-div">
    <h4>How to get there:</h4>
    <p>Provided by: {props.routeObject.acknowledgements}</p>
    {displayRoute()}
    </div>
  )
}

export default TransportComponent;
