import React, { Component } from 'react';
import CinemaPostcodeSearchList from '../components/postcode_search/CinemaPostcodeSearchList.js';
import FilmPostcodeSearchList from '../components/postcode_search/FilmPostcodeSearchList.js';

class PostcodeSearchResult extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  };

  render() {
    return(
      <div>
      <CinemaPostcodeSearchList localCinemas={this.props.cinemaList}/>

      </div>
    );
  }

}

export default PostcodeSearchResult;


// <FilmPostcodeSearchList uniqueLocalFilms={this.props.uniqueFilms}/>
