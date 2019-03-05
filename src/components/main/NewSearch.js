import React from 'react';

const NewSearch = (props) =>{
  if(!props.searchedPostcode){
    return null;
    }

function handleClick(){
  console.log("button clicked");
}

    return(
      <div className="new-search-button">
      <button  onClick={handleClick()}>New Search</button>
      </div>
        )
}


export default NewSearch;
