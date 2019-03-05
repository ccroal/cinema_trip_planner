import React, {Component, Fragment} from 'react';
import Request from '../helpers/request';
import Config from '../config.js';
// import {BrowserRouter as Router, Route} from 'react-router-dom';

import Search from '../components/main/Search.js';
import MainHeader from '../components/main/MainHeader.js';
// import Quote from '../components/main/Quote.js';

import PostcodeSearchResult from './PostcodeSearchResult.js';
import CinemaTimesContainer from './CinemaTimesContainer';
import CinemaSearchResult from './CinemaSearchResult.js';
// import FilmSearchResult from './FilmSearchResult.js';
import SelectedScreeningContainer from './SelectedScreeningContainer.js';

// import {BrowserRouter as Router, Route} from 'react-router-dom';


class MainContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchedPostcode: "",
      cinemasByPostcode: [],
      allMoviesAndCinemas: [],
      uniqueFilmNames: [],
      selectedFilm: null,
      currentCinemaListings: null,
      selectedFinalObject: null,
      routeObject: null
    }

    this.loadFilms = this.loadFilms.bind(this);
    this.getAllFilms = this.getAllFilms.bind(this);
    this.getUniqueFilmsList = this.getUniqueFilmsList.bind(this);
    this.handlePostcodeInput = this.handlePostcodeInput.bind(this);
    this.handleFilmChange = this.handleFilmChange.bind(this);
    this.handleCinemaSelected = this.handleCinemaSelected.bind(this);
    this.setCinemaListings = this.setCinemaListings.bind(this);
    this.setSelectedCinemaDetails = this.setSelectedCinemaDetails.bind(this);
    this.handleTimeSelection = this.handleTimeSelection.bind(this);
    this.setObject = this.setObject.bind(this);
    this.isPostcodeEntered = this.isPostcodeEntered.bind(this);
    this.getTransportRoute = this.getTransportRoute.bind(this);
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
    this.setState({searchedPostcode: postcode})
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

  setCinemaListings(cinema_id){
    const selectedCinema = this.state.allMoviesAndCinemas.results.map((result)=>{
      if(result.cinema === cinema_id){
        console.log('selected cinema:', result);
        this.setState({currentCinemaListings: result.listings});
        return result
      }
    })
  }

  setSelectedCinemaDetails(cinema_id){
    const selectedCinemaInfo = this.state.cinemasByPostcode.map((cinema) => {
      if(cinema.id === cinema_id) {
        this.setState({selectedCinema: cinema})
      }
    })
  }

  handleTimeSelection(time, filmTitle, cinema_id) {
    const request = new Request();
    const url = "https://api.cinelist.co.uk/get/cinema/" + cinema_id;
    request.get(url).then((data) => {
      console.log(data);
      return data;
    }).then((data) => {
      this.setObject(time, filmTitle, data)
      })
      .then(() => {
        const postcode = this.state.selectedFinalObject.cinemaDetails.postcode
        const regex = / /g;
        const amendedPostcode = postcode.replace(regex, '');
        // this.getTransportRoute(amendedPostcode);
      })
    }


  setObject(time, filmTitle, cinemaDetails) {
    const finalObject = {
      screeningTime: time,
      filmTitle: filmTitle,
      cinemaDetails: cinemaDetails
    }
    this.setState({selectedFinalObject: finalObject})

  }

  handleCinemaSelected(cinema_id){
    this.setCinemaListings(cinema_id);
    this.setSelectedCinemaDetails(cinema_id);
  }

  isPostcodeEntered(){
    if(this.state.searchedPostcode && !this.state.selectedFinalObject){
      return (
        <PostcodeSearchResult cinemaList={this.state.cinemasByPostcode}
        onCinemaSelected={this.handleCinemaSelected} uniqueFilmsList={this.state.uniqueFilmNames} onFilmSelected={this.handleFilmChange}/>
      )
    };

  }

  isTimeSelected(){
    if(!this.state.selectedFinalObject){
      return (
        <div>
        <CinemaSearchResult cinemaScreenings={this.state.currentCinemaListings} handleTimeSelection={this.handleTimeSelection} selectedCinema={this.state.selectedCinema} />
        <CinemaTimesContainer cinemaInformation={this.state} handleTimeSelection={this.handleTimeSelection}/>
        </div>
      )} else {
        return (
          <div>
          <SelectedScreeningContainer selectedFinalObject={this.state.selectedFinalObject} searchedPostcode={this.state.searchedPostcode}/>
          </div>
        )
      }
    }


  getTransportRoute(endPostCode){
    const request = new Request();
    const url = `https://transportapi.com/v3/uk/public/journey/from/postcode:${this.state.searchedPostcode}/to/postcode:${endPostCode}.json?app_id=${Config.appId}&app_key=${Config.apiKey}&service=southeast`
    request.get(url).then((data) => {
      this.setState({routeObject: data})
    })
  }



  render() {
    return (
      <div>
      <MainHeader title="This is our app!" />
      <Search onPostcodeSubmit={this.handlePostcodeInput}/>
      {this.isPostcodeEntered()}
      {this.isTimeSelected()}
      </div>
    );
  }
  //
  // //1.  when user enters the app- only main header and search components displaying
  // <MainHeader title="This is our app!" />
  // <Search onPostcodeSubmit={this.handlePostcodeInput}/>
  //
  // //2.  user enters postcode - then PostcodeSearchResultContainer will render
  //
  // <PostcodeSearchResult cinemaList={this.state.cinemasByPostcode}
  // onCinemaSelected={this.handleCinemaSelected} uniqueFilmsList={this.state.uniqueFilmNames} onFilmSelected={this.handleFilmChange}/>
  //
  // //3.  user will search either by film title or cinema
  // //(conside how to disable other serach dropdown)
  //
  // <CinemaSearchResult cinemaScreenings={this.state.currentCinemaListings} handleTimeSelection={this.handleTimeSelection} selectedCinema={this.state.selectedCinema} />
  //
  // <CinemaTimesContainer cinemaInformation={this.state} handleTimeSelection={this.handleTimeSelection}/>
  //
  // //4.  once user has selected a screening time, remove CinemaSearchResult and CinemaTimesContainer
  //
  // <SelectedScreeningContainer selectedFinalObject={this.state.selectedFinalObject} searchedPostcode={this.state.searchedPostcode}/>






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
