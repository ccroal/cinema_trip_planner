import React, {Component, Fragment} from 'react';
import Request from '../helpers/request';
// import {BrowserRouter as Router, Route} from 'react-router-dom';

import Search from '../components/main/Search.js';
import MainHeader from '../components/main/MainHeader.js';
// import Quote from '../components/main/Quote.js';

import PostcodeSearchResult from './PostcodeSearchResult.js';
import CinemaTimesContainer from './CinemaTimesContainer';
import CinemaSearchResult from './CinemaSearchResult.js';
// import FilmSearchResult from './FilmSearchResult.js';
// import SelectedScreening from './SelectedScreening.js';

// import {BrowserRouter as Router, Route} from 'react-router-dom';


class MainContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      cinemasByPostcode: [],
      allMoviesAndCinemas: [],
      uniqueFilmNames: [],
      selectedFilm: null,
      currentCinema: null
    }

    this.loadFilms = this.loadFilms.bind(this);
    this.getAllFilms = this.getAllFilms.bind(this);
    this.getUniqueFilmsList = this.getUniqueFilmsList.bind(this);
    this.handlePostcodeInput = this.handlePostcodeInput.bind(this);
    this.handleFilmChange = this.handleFilmChange.bind(this);
    this.handleCinemaSelected = this.handleCinemaSelected.bind(this);
  }


  loadFilms(data){
    const cinemaIds = [];
    data.cinemas.map(cinema => {
      return cinemaIds.push(cinema.id)
    })
    const stringId = cinemaIds.toString();
    const result = this.getAllFilms(stringId);
    return result;
  }


  getAllFilms(ids){
    const request = new Request();
    const url = 'https://api.cinelist.co.uk/get/times/many/' + ids;
    request.get(url).then((data) => {
      this.setState({allMoviesAndCinemas:data});
      return data;
    }).then((result) => {
      this.getUniqueFilmsList(result);
    })
  }

  getUniqueFilmsList(allFilmsAndCinemasData){
    const allFilmsAtAllCinemasArrays = [];
    allFilmsAndCinemasData.results.map((result) => {
      return allFilmsAtAllCinemasArrays.push(result.listings);
    })
    const allFilmsAtAllCinemas = allFilmsAtAllCinemasArrays.flat();
    console.log('all', allFilmsAtAllCinemas);
    const uniqueFilms = [...new Set(allFilmsAtAllCinemas.map(film => film.title))];
    uniqueFilms.sort();
    this.setState({uniqueFilmNames: uniqueFilms})
  }

  handlePostcodeInput(postcode) {
    const request = new Request();
    console.log('postcode: ', postcode);
    const url = 'https://api.cinelist.co.uk/search/cinemas/postcode/' + postcode;
    console.log(url);
    request.get(url).then((data) => {
      this.setState({cinemasByPostcode: data.cinemas});
      console.log(data);
      return data;
    })
    .then((data) => {
      this.loadFilms(data);
    })
  }


  handleFilmChange(film){
    this.setState({selectedFilm: film})
  }

  handleCinemaSelected(cinema_id){
    const selectedCinema = this.state.allMoviesAndCinemas.results.map((result)=>{
      if(result.cinema === cinema_id){
        console.log(result);
        this.setState({currentCinema: result.listings});
        return result
      }
    })
    console.log('cinema id in main:', cinema_id);
  }

  render() {
    return (
        <div>
        <MainHeader title="This is our app!" />
        <Search onPostcodeSubmit={this.handlePostcodeInput}/>
        <PostcodeSearchResult cinemaList={this.state.cinemasByPostcode}
        onCinemaSelected={this.handleCinemaSelected} uniqueFilmsList={this.state.uniqueFilmNames} onFilmSelected={this.handleFilmChange}/>
        <CinemaSearchResult cinemaScreenings={this.state.currentCinema} />
        <CinemaTimesContainer cinemaInformation={this.state} />
        </div>
    );
  }

  // <Router>
  // <Fragment>
  //
  //   <Route exact path="/" component={Quote} />
  //   <Route exact path="/location/:postcode" component={PostcodeSearchResult} />
  //   <Route exact path="/location/:postcode/cinema/:cinema_id" component={CinemaSearchResult} />
  //   <Route exact path="/location/:postcode/film/:title" component={FilmSearchResult} />
  //   <Route exact path="/location/:postcode/cinema/:cinema_id/film/:title/time/:time" component={SelectedScreening} />
  //   </ Fragment>
  //   </Router>
}


export default MainContainer;
