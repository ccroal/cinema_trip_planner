import React, {Component} from 'react';
import Request from '../helpers/request';
import Search from '../components/main/Search.js';
import MainHeader from '../components/main/MainHeader.js';

class MainContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      postcodeSearch: '',
      cinemasByPostcode: [],
      allMoviesAndCinemas: [],
      uniqueFilmObjects: []
    }

    this.loadFilms = this.loadFilms.bind(this);
    this.getAllFilms = this.getAllFilms.bind(this);
    this.getUniqueFilmsList = this.getUniqueFilmsList.bind(this);
    this.handlePostcodeInput = this.handlePostcodeInput.bind(this);
  }

  componentDidMount(){
    const request = new Request()
    const url = 'https://api.cinelist.co.uk/search/cinemas/postcode/' + this.state.postcodeSearch;
    request.get(url).then((data) => {
      this.setState({cinemasByPostcode: data});
      return data;
    }).then((data) => {
      this.loadFilms(data);
    })
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
    })
  }

  getUniqueFilmsList(){
    const allFilmsAtAllCinemasArrays = [];
    this.state.allMoviesAndCinemas.results.map((result) => {
      return allFilmsAtAllCinemasArrays.push(result.listings);
    })

    const allFilmsAtAllCinemas = allFilmsAtAllCinemasArrays.flat();
    const uniqueFilms = allFilmsAtAllCinemas.indexOf(allFilmsAtAllCinemas.title);
    this.setState({uniqueFilmObjects: uniqueFilms})
  }

  handlePostcodeInput(postcode) {
    this.setState({ postcodeSearch: postcode });
  }

  render() {
    return (
      <div>
        <MainHeader title="This is our app!" />
        <Search onPostcodeSubmit={this.handlePostcodeInput}/>
      </div>
    );
  }
}


export default MainContainer;
