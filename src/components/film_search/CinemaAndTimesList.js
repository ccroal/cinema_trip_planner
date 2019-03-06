import React from 'react';
import CinemaAndTimes from './CinemaAndTimes';

const CinemaAndTimesList = (props) => {



  const allCinemas = props.allCinemaData

  const cinemasAndTimesList = props.allListingsData.map((cinema) => {
    return (<li className="cinema-item">
      <CinemaAndTimes cinemaAndTimes={cinema} allCinemaData={allCinemas} timeSelection={handleTimeSelection}/>
      </li>)
  })

  function handleTimeSelection(time, filmTitle, cinema_id){
    props.timeSelection(time, filmTitle, cinema_id);
  }


  return(
    <div className="cinema-film-selection">
    <h1>Select a screening time for '{props.allListingsData[0].listings.title}'</h1>
    <ul className="cinema-and-times-list-component" >
      {cinemasAndTimesList}
    </ul>
    </div>
  )
}


export default CinemaAndTimesList;
