import React, { Component } from 'react';


class PostcodeSearchResult extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedCinema: null,
      selectedFilm: null
    }

    this.populateFilmDropdown = this.populateFilmDropdown.bind(this);
    this.populateCinemaDropdown = this.populateCinemaDropdown.bind(this);
    this.handleFilmChange = this.handleFilmChange.bind(this);
    this.handleCinemaChange = this.handleCinemaChange.bind(this);
    this.checkDropdownSelected = this.checkDropdownSelected.bind(this);
  }

  populateFilmDropdown(){
    if (!this.props.uniqueFilmsList){
      return null
    }
    const films = this.props.uniqueFilmsList.map((film, index) => {
      return <option value={film} key={index}>{film}</option>
    })
    return films;
  }

  populateCinemaDropdown(){
    if (!this.props.cinemaList){
      return null
    }
    const cinemas = this.props.cinemaList.map((cinema, index) => {
      return <option value={cinema.id} key={index}>{cinema.name},{cinema.distance} miles</option>
    })
    return cinemas;
  }

  handleFilmChange(event){
    const selectedFilm = event.target.value;
    this.props.onFilmSelected(selectedFilm);
    this.setState({selectedFilm: selectedFilm})
  }

  handleCinemaChange(event){
    const selectedCinema = event.target.value;
    this.props.onCinemaSelected(selectedCinema);
    this.setState({selectedCinema: selectedCinema})
  }

  checkDropdownSelected(){
    if (!this.state.selectedCinema && !this.state.selectedFilm) {
      return(
        <div>
        <select id="film-selector" defaultValue="default" onChange={this.handleFilmChange}>
        <option disabled value="default">Choose a Film...</option>
        {this.populateFilmDropdown()}
        </select>

        <select id="cinema-selector" defaultValue="default"
        onChange={this.handleCinemaChange}>
        <option disabled value="default">Choose a Cinema</option>
        {this.populateCinemaDropdown()}
        </select>
        </div>
      )} else if (this.state.selectedCinema && !this.state.selectedFilm) {
        return(
          <div>
          <select id="cinema-selector" defaultValue="default"
          onChange={this.handleCinemaChange}>
          <option disabled value="default">Choose a Cinema</option>
          {this.populateCinemaDropdown()}
          </select>
          </div>
        )} else if (!this.state.selectedCinema && this.state.selectedFilm) {
          return(
            <div>
            <select id="film-selector" defaultValue="default" onChange={this.handleFilmChange}>
            <option disabled value="default">Choose a Film...</option>
            {this.populateFilmDropdown()}
            </select>
            </div>
          )}
        }

        render(){
          return(
            <div>
            {this.checkDropdownSelected()}
            </div>
          )
        }

      }



      export default PostcodeSearchResult;

      // while both drop downs have value of default, make both undisabled
      // once one has a value of not default, diasble the other

      // separate function - if
