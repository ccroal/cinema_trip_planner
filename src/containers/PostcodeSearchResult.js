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

    return(

      <select id="film-selector" defaultValue="default" onChange={handleFilmChange}>
            <option disabled value="default">Choose a Film...</option>
            {films}
      </select>
    )

}


export default PostcodeSearchResult;
