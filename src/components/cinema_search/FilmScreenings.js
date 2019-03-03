import React from 'react';

const FilmScreenings = (props) => {
  if(!props.title || !props.times){
    return (
      <p>waiting to load</p>
    )
  }

  return (
    <div>
    <p>{props.title}</p>
    <p>{props.times}</p>
    </div>
  )
}
export default FilmScreenings;
