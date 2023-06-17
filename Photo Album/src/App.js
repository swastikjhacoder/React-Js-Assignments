import React from "react";
import ImageList from "./components/ImageList";
import "./styles.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      imageUrl: ""
    };
  }

  setImageUrl = (e) => {
    this.setState({ imageUrl: e.target.value });
  };

  onAddImage = (e) => {
    e.preventDefault();
    this.addImageToLS();
    this.setState((prevState) => {
      return {
        images: [...prevState.images, this.state.imageUrl],
        imageUrl: ""
      };
    });
  };

  addImageToLS = () => {
    localStorage.setItem(
      "images",
      JSON.stringify([...this.state.images, this.state.imageUrl])
    );
  };

  getImagesFromLS = () => {
    const images = localStorage.getItem("images");
    if (!images) {
      localStorage.setItem("images", []);
      return [];
    }
    return JSON.parse(images);
  };

  componentDidMount() {
    const images = this.getImagesFromLS();
    this.setState({ images });
  }

  render() {
    return (
      <>
        <form onSubmit={this.onAddImage}>
          <input
            type="text"
            placeholder="Image URL"
            onChange={this.setImageUrl}
            value={this.state.imageUrl}
          />
          <button>Add Image</button>
        </form>
        <ImageList images={this.state.images} />
      </>
    );
  }
}
