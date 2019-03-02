import React, {Component} from 'react';
import Request from '../helpers/request'


class MainContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      postcodeSearch: "G467AN",
      cinemasByPostcode: [],
      allMovies: []
    }

    this.loadFilms = this.loadFilms.bind(this);
    this.getAllFilms()
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
    this.getAllFilms(stringId);
  }


  getAllFilms(ids){
    const request = new Request();
    const url = 'https://api.cinelist.co.uk/get/times/many/' + ids;
    request.get(url).then((data) => {
      this.setState({allMovies:data});
    })
  }


  render(){
    return(
    <h1>This is our main Container</h1>
    )
  }
}


export default MainContainer;
