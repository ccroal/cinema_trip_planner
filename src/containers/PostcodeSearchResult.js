import React, { Component } from 'react';
import CinemaPostcodeSearchList from '../components/postcode_search/CinemaPostcodeSearchList.js';
import FilmPostcodeSearchList from '../components/postcode_search/FilmPostcodeSearchList.js';

const PostcodeSearchResult = (props) => {

  const films = props.uniqueFilmsList.map((film, index) => {
    return <option value={film} key={index}>{film}</option>
  })

  function handleFilmChange(event){
    props.onFilmSelected(event.target.value)
  }

  const cinemas = props.cinemaList.map((cinema) => {
    return <option value={cinema.id}>{cinema.name},{cinema.distance} miles</option>
  })

  function handleCinemaChange(event){
    props.onCinemaSelected(event.target.value);
    console.log('cinemaId', event.target.value);
  }

  return(
    <div>
    <select id="film-selector" defaultValue="default" onChange={handleFilmChange}>
    <option disabled value="default">Choose a Film...</option>
    {films}
    </select>

    <select id="cinema-selector" defaultValue="default"
    onChange={handleCinemaChange}>
    <option disabled value="default">Choose a Cinema</option>
    {cinemas}
    </select>
    </div>
  )

}


export default PostcodeSearchResult;
