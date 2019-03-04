import React from 'react';

const FilmScreenings = (props) => {


  const onSelection = (event) => {
    console.log(event.target.value);
  }

  if(!props.title || !props.times){
    return (
      <p>waiting to load</p>
    )
  }
  const allTimings = props.times.map((time) => {
    return <button onClick={onSelection} value={time}>{time}</button>
  })

  return (
    <div>
    <p>{props.title}</p>
    {allTimings}
    </div>
  )
}
export default FilmScreenings;


//for each time,
// create an a tag
// add a space
