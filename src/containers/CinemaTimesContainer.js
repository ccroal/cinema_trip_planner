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
          listingsData.push({cinemaid: cinemaObject.cinema, listings: listing})
          }
        })
      })

    return(
        <ul className="cinema-and-times-list">
        <li className="cinema-and-times-list-itme">
          <CinemaAndTimesList allListingsData={listingsData} allCinemaData={allCinemas}/>
          </li>
        </ul>
    )
}


export default CinemaTimesContainer;
