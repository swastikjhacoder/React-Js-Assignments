import { Component } from "react";
import AnimeCard from "./AnimeCard";

class AnimeList extends Component {
  render() {
    return (
      <div className="anime-list">
        {this.props.anime.map((anime, i) => {
          return <AnimeCard name={anime.name} image={anime.image} key={i} />;
        })}
      </div>
    );
  }
}

export default AnimeList;
