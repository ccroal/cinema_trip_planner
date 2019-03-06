import React from 'react';

const FilmScreenings = (props) => {

  const onSelection = (event) => {
    props.handleScreeningSelection(event.target.value, props.title, props.cinema_id)
  }

  if(!props.title || !props.times){
    return (
      <p>waiting to load</p>
    )
  }

  const allTimings = props.times.map((time, index) => {
    return <button className="time-button" onClick={onSelection} value={time} key={index}>{time}</button>
  })

  return (
    <div>
    <h4>{props.title}</h4>
    {allTimings}
    </div>
  )
}
export default FilmScreenings;
