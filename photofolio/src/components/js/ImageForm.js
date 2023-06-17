//importing Reacts hooks
import { useEffect, useRef } from "react";
//expoting the component
export const ImageForm = ({
  updateIntent,
  albumName,
  onAdd,
  onUpdate,
  loading,
}) => {
  const imageTitleInput = useRef();
  const imageUrlInput = useRef();
  //Arrow Function Components
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = imageTitleInput.current.value;
    const url = imageUrlInput.current.value;

    if (!updateIntent) onAdd({ title, url });
    else onUpdate({ title, url });
    handleClear();
  };
  //Arrow Function Components
  const handleClear = () => {
    imageTitleInput.current.value = "";
    imageUrlInput.current.value = "";
  };
  //performing side effect
  useEffect(() => {
    const handleDefaultValues = () => {
      imageTitleInput.current.value = updateIntent.title;
      imageUrlInput.current.value = updateIntent.url;
    };
    
    if (updateIntent) {
      handleDefaultValues();
    }
  }, [updateIntent]);

  return (
    //creating the UI
    <div className="imageForm">
      <span>
        {!updateIntent
          ? `Add image to ${albumName}`
          : `Update image ${updateIntent.title}`}
      </span>

      <form onSubmit={handleSubmit}>
        <input required placeholder="Title" ref={imageTitleInput} />
        <input required placeholder="Image URL" ref={imageUrlInput} />
        <div className="actions">
          <button type="button" onClick={handleClear} disabled={loading}>
            Clear
          </button>
          <button disabled={loading}>{!updateIntent ? "Add" : "Update"}</button>
        </div>
      </form>
    </div>
  );
};
