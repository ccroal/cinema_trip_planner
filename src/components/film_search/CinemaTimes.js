import React from 'react'

const CinemaTimes = (props) => {
    if(!props.cinemaInformation.selectedFilm){
      return null
    }

    // function getTimes(){
    // const listingsData =[];
    // console.log('Results', props.cinemaInformation.allMoviesAndCinemas.results);
    // props.cinemaInformation.allMoviesAndCinemas.results.map((cinemaObject)=>{
    //   if(props.cinemaInformation.selectedFilm == props.cinemaInformation.allMoviesAndCinemas.listings.title){
    //     return listingsData.push(cinemaObject.cinema)
    //     }
    //   })
    //   console.log('End', listingsData);
    //   return listingsData;
    //
    // }

    function displayTimes(){
      const cinemasAndTimes = [];
      console.log('the end',cinemasAndTimes);
    }


      return(
        <p>Hello</p>
      )
}


export default CinemaTimes;
