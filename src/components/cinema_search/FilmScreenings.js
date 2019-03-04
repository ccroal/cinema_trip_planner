import React from 'react';

const FilmScreenings = (props) => {

  const onSelection = (event) => {
    props.handleScreeningSelection(event.target.value)
  }

  if(!props.title || !props.times){
    return (
      <p>waiting to load</p>
    )
  }

  const allTimings = props.times.map((time, index) => {
    return <button onClick={onSelection} value={time} key={index}>{time}</button>
  })

  return (
    <div>
    <p>{props.title}</p>
    {allTimings}
    </div>
  )
}
export default FilmScreenings;
