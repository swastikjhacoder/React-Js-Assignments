//exporting the functional components
export const Carousel = ({ onNext, onPrev, onCancel, url, title }) => {
    return (
      //Creating UI for the image load
      <div className="carousel">
        <button onClick={onCancel}>x</button>
        <button onClick={onPrev}>{"<"}</button>
        <img src={url} alt={title} />
        <button onClick={onNext}>{">"}</button>
      </div>
    );
  };
  