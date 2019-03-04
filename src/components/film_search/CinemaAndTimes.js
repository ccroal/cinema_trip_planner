import React from 'react';

const CinemaAndTimes = (props) => {

  function getCinemaName(){
    console.log('cinemaname', props.cinemaAndTimes);
     const cinemaName = props.allCinemaData.map((cinema) => {
      if(cinema.id === props.cinemaAndTimes.cinemaid)
      return cinema.name
    })
    return cinemaName

  }

  function displayScreenings(){
    const times = props.cinemaAndTimes.listings.times.map((time) => {
    return <li>{time}</li>
  })
  return times
  }

  return(
    <div className="cinema-and-time-component">
      <h1>Cinema: {getCinemaName()}</h1>
      <ul>Times: {displayScreenings()}</ul>
    </div>
  )
}

export default CinemaAndTimes;
