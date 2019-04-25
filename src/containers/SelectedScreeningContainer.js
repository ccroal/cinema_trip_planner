import React, { Component } from 'react';
import SelectedScreeningComponent from '../components/final_results/SelectedScreeningComponent.js';
import TransportComponent from '../components/final_results/TransportComponent.js'



class SelectedScreeningContainer extends Component {

  constructor(props){
    super(props);
  }

  randomQuotes(){
    const quotes = [
     " “I'm going to make him an offer he can't refuse.” The Godfather, 1972 ",
     "“Toto, I've got a feeling we're not in Kansas anymore.” The Wizard of Oz, 1939",
     "“Here's looking at you, kid.” Casablanca, 1942",
     "“Fasten your seatbelts. It's going to be a bumpy night.” All About Eve, 1950",
     "“What we've got here is failure to communicate.” Cool Hand Luke, 1967",
     "“E.T. phone home.” E.T. The Extra-Terrestrial, 1982",
     "“They call me Mister Tibbs!” In the Heat of the Night, 1967",
     "“Made it, Ma! Top of the world!” White Heat, 1949",
     "I'm as mad as hell, and I'm not going to take this anymore!” Network, 1976",
     "“Gentlemen, you can't fight in here! This is the War Room! Dr. Strangelove 1964"
    ]
    const randomquote = quotes[Math.floor(Math.random()*quotes.length)]
    return randomquote
  }

  render(){

    if(!this.props.routeObject){
        return(
          <div className="random-quote">
         {this.randomQuotes()}
         </div>
        )
      }
    return (
      <div className="final-page-div">
        <SelectedScreeningComponent finalObject={this.props.selectedFinalObject}/>
        <TransportComponent routeObject={this.props.routeObject} />
      </div>
    )

  }
}

export default SelectedScreeningContainer;
