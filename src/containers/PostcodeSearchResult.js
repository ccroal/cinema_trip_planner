import React, { Component } from 'react';
import CinemaPostcodeSearchList from '../components/postcode_search/CinemaPostcodeSearchList.js';
import FilmPostcodeSearchList from '../components/postcode_search/FilmPostcodeSearchList.js';

class PostcodeSearchResult extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  };

  // passed the list of local cinemas and unique film titles from parent

  render() {
    return(
      <div>
      <CinemaPostcodeSearchList localCinemas={this.props.cinemaList}/>
      <FilmPostcodeSearchList uniqueLocalFilms={this.props.uniqueFilms}/>
      </div>
    );
  }

}

export default PostcodeSearchResult;
