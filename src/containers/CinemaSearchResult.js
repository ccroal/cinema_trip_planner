import React, { Component } from 'react';
import FilmScreenings from '../components/cinema_search/FilmScreenings.js';

const CinemaSearchResult = (props) => {

  if(!props.cinemaScreenings){
    return null;
  }

  function handleScreeningSelection(time, filmTitle, cinema_id) {
    props.handleTimeSelection(time, filmTitle, cinema_id);
  }

  const screenings = props.cinemaScreenings.map((film, index) => {
    return (

      <li className="screening-list-item" key={index}>
      <FilmScreenings title={film.title} times={film.times} handleScreeningSelection={handleScreeningSelection} cinema_id={props.selectedCinema.id}/>
      </li>
  )
  })


return (
  <div>
  <p>Please select a screening time for {props.selectedCinema.name} below:</p>
  <ul className="screenings-list">
    {screenings}
    </ul>
    </div>
)

}


export default CinemaSearchResult;
