import React from 'react';
import CinemaAndTimes from './CinemaAndTimes';

const CinemaAndTimesList = (props) => {

  const allCinemas = props.allCinemaData
  console.log('allCinemas', allCinemas);
  const cinemasAndTimesList = props.allListingsData.map((cinema) => {
    return (<li className="cinema-item">
      <CinemaAndTimes cinemaAndTimes={cinema} allCinemaData={allCinemas} />
      </li>)
  })

 console.log('cinemaAndTimes list', cinemasAndTimesList);

  return(
    <ul className="cinema-and-times-list-component" >
      {cinemasAndTimesList}
    </ul>
  )
}


export default CinemaAndTimesList;
