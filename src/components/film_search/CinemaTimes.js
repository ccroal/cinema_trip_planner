import React from 'react'

const CinemaTimes = (props) => {
    if(!props.cinemaInformation.selectedFilm){
      return null
    }

    //Returns an array of objects with cinema Id and all showtimes
    function getTimesandId(){
      const listingsData = []

      props.cinemaInformation.allMoviesAndCinemas.results.map((cinemaObject)=>{
      cinemaObject.listings.map((listing) => {
      if(props.cinemaInformation.selectedFilm === listing.title){
        listingsData.push({cinemaid: cinemaObject.cinema, listings: listing})
        }
      })
    })
      console.log('End', listingsData);
      return listingsData;
    }

    
    function getTimes(timesAndId){
      const times = timesAndId.map((listingObject) => {
        return listingObject.listings.times})
      return times;
    }

    function getId(timesAndId){
      const ids = timesAndId.map((listingObject) => {
        return listingObject.cinemaid})
      }

    function displayTimes(){
      const cinemasIdAndTimes = getTimesandId()
    }


      return(
        <p>{displayTimes()}</p>
      )
}


export default CinemaTimes;
