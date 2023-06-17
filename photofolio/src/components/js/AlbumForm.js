//imports from React
import { useRef } from "react";
//exporting the component
export const AlbumForm = ({ onAdd, loading }) => {
  const albumNameInput = useRef();
  //Arrow Function Components to clear the input field
  const handleClear = () => (albumNameInput.current.value = "");
  //Arrow Function Components to handle album creation
  const handleSubmit = (e) => {
    e.preventDefault();
    const albumName = albumNameInput.current.value;
    onAdd(albumName);
    handleClear();
  };

  return (
    //creating the UI
    <div className="albumForm">
      <span>Create an album</span>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Album Name" ref={albumNameInput} />
        <button type="button" onClick={handleClear} disabled={loading}>
          Clear
        </button>
        <button disabled={loading}>Create</button>
      </form>
    </div>
  );
};
