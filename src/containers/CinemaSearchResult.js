import React, { Component } from 'react';
import FilmScreenings from '../components/cinema_search/FilmScreenings.js';

const CinemaSearchResult = (props) => {

  if(!props.cinemaScreenings){
    return null;
  }

  const screenings = props.cinemaScreenings.map((film) => {
    return (

      <li className="screening-list-item">
      <FilmScreenings title={film.title} times={film.times} />
      </li>
  )
  })
// handleScreeningSelection={handleScreeningSelection}
// function handleScreeningSelection(time) {
//   console.log(time);
// }

return (
  <div>
  <p>Please select a screening time below:</p>
  <ul className="screenings-list">
    {screenings}
    </ul>
    </div>
)

}


export default CinemaSearchResult;
