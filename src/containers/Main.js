import React, {Component} from 'react';
import Request from '../helpers/request';
import Config from '../config.js';

import Search from '../components/main/Search.js';
import MainHeader from '../components/main/MainHeader.js';

import PostcodeSearchResult from './PostcodeSearchResult.js';
import CinemaTimesContainer from './CinemaTimesContainer';
import CinemaSearchResult from './CinemaSearchResult.js';

import SelectedScreeningContainer from './SelectedScreeningContainer.js';


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
    const uniqueFilms = [...new Set(allFilmsAtAllCinemas.map(film => film.title))];
    uniqueFilms.sort();
    this.setState({uniqueFilmNames: uniqueFilms})
  }

  handlePostcodeInput(postcode) {
    const request = new Request();
    this.setState({searchedPostcode: postcode})
    const url = 'https://api.cinelist.co.uk/search/cinemas/postcode/' + postcode;
    request.get(url).then((data) => {
      this.setState({cinemasByPostcode: data.cinemas});
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
    this.state.allMoviesAndCinemas.results.map((result)=>{
      if(result.cinema === cinema_id){
        this.setState({currentCinemaListings: result.listings});
        return result
      }
    })
  }

  setSelectedCinemaDetails(cinema_id){
    this.state.cinemasByPostcode.map((cinema) => {
      if(cinema.id === cinema_id) {
        return this.setState({selectedCinema: cinema})
      }
    })
  }

  handleTimeSelection(time, filmTitle, cinema_id) {
    const request = new Request();
    const url = "https://api.cinelist.co.uk/get/cinema/" + cinema_id;
    request.get(url).then((data) => {
      return data;
    }).then((data) => {
      this.setObject(time, filmTitle, data)
      })
      .then(() => {
        const postcode = this.state.selectedFinalObject.cinemaDetails.postcode
        const regex = / /g;
        const amendedPostcode = postcode.replace(regex, '');
        this.getTransportRoute(amendedPostcode);
      })
    }


  setObject(time, filmTitle, cinemaDetails) {
    const finalObject = {
      screeningTime: time,
      filmTitle: filmTitle,
      cinemaDetails: cinemaDetails,
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
          <SelectedScreeningContainer selectedFinalObject={this.state.selectedFinalObject} searchedPostcode={this.state.searchedPostcode} routeObject={this.state.routeObject}/>
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
      <div className="main-container">
      <MainHeader title="Now Showing..." />
      <Search onPostcodeSubmit={this.handlePostcodeInput}/>
      {this.isPostcodeEntered()}

      {this.isTimeSelected()}

      </div>
    );
  }

}


export default MainContainer;
