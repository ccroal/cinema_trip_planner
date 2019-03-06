import React from 'react';

const CinemaAndTimes = (props) => {

  function getCinemaName(){
     const cinemaName = props.allCinemaData.map((cinema) => {
      if(cinema.id === props.cinemaAndTimes.cinemaid)
      return cinema.name
    })
    return cinemaName

  }

  const onSelection = (event) => {
    event.preventDefault()
    props.timeSelection(event.target.value, props.cinemaAndTimes.listings.title, props.cinemaAndTimes.cinemaid, )
  }

  function displayScreenings(){
    const times = props.cinemaAndTimes.listings.times.map((time, index) => {
    return <button className="time-button" onClick={onSelection} value={time} key={index}>{time}</button>
  })
  return times
  }

  return(
    <div className="cinema-and-time-component">
      <h4>{getCinemaName()}</h4>
      <ul>{displayScreenings()}</ul>
    </div>
  )
}

export default CinemaAndTimes;
