import React, { Component } from 'react';
import CinemaPostcodeSearchList from '../components/postcode_search/CinemaPostcodeSearchList.js';
import FilmPostcodeSearchList from '../components/postcode_search/FilmPostcodeSearchList.js';

const PostcodeSearchResult = (props) => {

  const cinemas = props.cinemaList.map((cinema) => {
    return <option value={cinema.id}>{cinema.name},{cinema.distance} miles</option>
  })

  function handleCinemaChange(event){
    props.onCinemaSelected(event.target.value);
    console.log('cinemaId', event.target.value);
  }

return(
      <select id="cinema-selector" defaultValue="default"
      onChange={handleCinemaChange}>
      <option disabled value="default">Choose a Cinema</option>
      {cinemas}
      </select>
)


  }


  export default PostcodeSearchResult;
