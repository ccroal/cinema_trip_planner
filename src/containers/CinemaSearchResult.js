import React, { Component } from 'react';
import FilmScreenings from '../components/cinema_search/FilmScreenings.js';

const CinemaSearchResult = (props) => {

  if(!props.cinemaScreenings){
    return <p>Waiting to load</p>
  }

  const screenings = props.cinemaScreenings.map((film) => {
    return (

      <li className="screening-list-item">
      {film.title}
      </li>
  )
  })

return (

  <ul className="screenings-list">
    {screenings}
    </ul>
)

}


export default CinemaSearchResult;
