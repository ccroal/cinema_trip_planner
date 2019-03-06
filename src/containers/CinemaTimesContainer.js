import React from 'react'
import CinemaAndTimesList from '../components/film_search/CinemaAndTimesList'

const CinemaTimesContainer = (props) => {
    if(!props.cinemaInformation.selectedFilm){
      return null
    }

    //Returns an array of objects with cinema Id and all showtimes
      const listingsData = []

      const allCinemas = props.cinemaInformation.cinemasByPostcode;

      props.cinemaInformation.allMoviesAndCinemas.results.map((cinemaObject)=>{
       cinemaObject.listings.map((listing) => {
        if(props.cinemaInformation.selectedFilm === listing.title){
          return listingsData.push({cinemaid: cinemaObject.cinema, listings: listing})
          }
        })
      })

      function handleSelectedTime(time, filmTitle, cinema_id){
        props.handleTimeSelection(time, filmTitle, cinema_id);
      }

    return(
          <CinemaAndTimesList allListingsData={listingsData} allCinemaData={allCinemas} timeSelection={handleSelectedTime}/>
    )
}


export default CinemaTimesContainer;
