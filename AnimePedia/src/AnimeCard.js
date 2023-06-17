import { Component } from "react";

class AnimeCard extends Component {
  render() {
    return (
      <div className="anime-card">
        <img src={this.props.image} alt={this.props.name} />
        <p>{this.props.name}</p>
      </div>
    );
  }
}

export default AnimeCard;
