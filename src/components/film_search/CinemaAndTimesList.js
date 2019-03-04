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
    <ul className="cinema-and-times-list-component" >
      {cinemasAndTimesList}
    </ul>
  )
}


export default CinemaAndTimesList;
