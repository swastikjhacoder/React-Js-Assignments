//importing the React necessary hooks
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "react-spinner-material";

// components imports
import { ImageForm } from "./ImageForm";
import { Carousel } from "./Carousel";

// firebase imports
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
  Timestamp,
  query,
  orderBy,
  doc,
} from "firebase/firestore";

import { db } from "./FirebaseInit";

// exporting component

export const ImagesList = ({ albumId, albumName, onBack, onSearch }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [searchForm, setSearchForm] = useState({search:""})

  const searchInput = useRef();

  function toggleSearch() {
    setSearch(!search);
    setIsActive(!isActive);
  }
  //Arrow Function Components
  const searchItems = (searchValue) => {
    setSearchForm(searchValue)
  }

  // performing side effect
  
  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      const imagesRef = collection(db, "album", albumId, "images");
      const imagesSnapshot = await getDocs(
        query(imagesRef, orderBy("created", "desc"))
      );
      const imagesData = imagesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(imagesData);
      setLoading(false);
    };
    getImages();
  }, [albumId]);

  const [addImageIntent, setAddImageIntent] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const [updateImageIntent, setUpdateImageIntent] = useState(false);

  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [activeHoverImageIndex, setActiveHoverImageIndex] = useState(null);
  //Arrow Function Components
  const handleNext = () => {
    if (activeImageIndex === images.length - 1) return setActiveImageIndex(0);
    setActiveImageIndex((prev) => prev + 1);
  };
  //Arrow Function Components
  const handlePrev = () => {
    if (activeImageIndex === 0) return setActiveImageIndex(images.length - 1);
    setActiveImageIndex((prev) => prev - 1);
  };
  const handleCancel = () => setActiveImageIndex(null);

  // async functions
  const handleAdd = async ({ title, url }) => {
    setImgLoading(true);
    const imageRef = await addDoc(collection(db, "album", albumId, "images"), {
      title,
      url,
      created: Timestamp.now(),
    });
    setImages((prev) => [{ id: imageRef.id, title, url }, ...prev]);

    toast.success("Image added successfully.");
    setImgLoading(false);
  };

  const handleUpdate = async ({ title, url }) => {
    setImgLoading(true);
    const imageRef = doc(db, "album", albumId, "images", updateImageIntent.id);

    await setDoc(imageRef, {
      title,
      url,
    });

    const updatedImages = images.map((image) => {
      if (image.id === imageRef.id) {
        return { id: imageRef.id, title, url };
      }
      return image;
    });

    setImages(updatedImages);
    toast.success("Image updated successfully.");
    setImgLoading(false);
    setUpdateImageIntent(false);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    await deleteDoc(doc(db, "album", albumId, "images", id));
    const filteredImages = images.filter((i) => i.id !== id);
    setImages(filteredImages);

    toast.success("Image deleted successfully.");
  };

  if (!images.length && !searchInput.current?.value && !loading) {
    return (
      <div className="Album-container">
        <div className="top">
          <span onClick={onBack}>
            <img src="https://cdn-icons-png.flaticon.com/512/0/340.png" alt="back" />
          </span>
          <h3>No images found in the album.</h3>

          {search && (
            <div>
              <input ref={searchInput} 
                type="search" 
                placeholder="Search..."
                value={searchForm.search}
                onChange={(e) => searchItems(e.target.value)}/>
          </div>
          )}
          <div onClick={toggleSearch}
          className={isActive?'cancel-search':'search'}></div>

          <button
            className={addImageIntent ? "active" : null}
            onClick={() => setAddImageIntent(!addImageIntent)}
          >
            {!addImageIntent ? "Add image" : "Cancel"}
          </button>
        </div>
        {addImageIntent && (
          <ImageForm
            loading={imgLoading}
            onAdd={handleAdd}
            albumName={albumName}
          />
        )}
      </div>
    );
  }
  return (
    <div className="Album-container">
      {(addImageIntent || updateImageIntent) && (
        <ImageForm
          loading={imgLoading}
          onAdd={handleAdd}
          albumName={albumName}
          onUpdate={handleUpdate}
          updateIntent={updateImageIntent}
        />
      )}
      {(activeImageIndex || activeImageIndex === 0) && (
        <Carousel
          title={images[activeImageIndex].title}
          url={images[activeImageIndex].url}
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={handleCancel}
        />
      )}
      <div className="top">
        <span onClick={onBack}>
          <img src="https://cdn-icons-png.flaticon.com/512/0/340.png" alt="back" />
        </span>
        <h3>Images in {albumName}</h3>

        {search && (
          <div>
          <input ref={searchInput} 
            type="search" 
            placeholder="Search..."
            value={searchForm.search}
            onChange={(e) => searchItems(e.target.value)}/>
        </div>
        )}
        <div onClick={toggleSearch}
        className={isActive?'cancel-search':'search'}></div>

        {updateImageIntent && (
          <button
            onClick={() => setUpdateImageIntent(false)}
          >
            Cancel
          </button>
        )}
        {!updateImageIntent && (
          <button
            className={addImageIntent ? "active" : null}
            onClick={() => setAddImageIntent(!addImageIntent)}
          >
            {!addImageIntent ? "Add image" : "Cancel"}
          </button>
        )}
      </div>
      {loading && (
        <div>
          <Spinner color="#0077ff" />
        </div>
      )}
      {!loading && (
        <div className="imageList">
          {images.map((image, i) => (
            <div
            className="image"
              key={image.id}
              onMouseOver={() => setActiveHoverImageIndex(i)}
              onMouseOut={() => setActiveHoverImageIndex(null)}
              onClick={() => setActiveImageIndex(i)}
            >
              <div
                className={`update ${
                  activeHoverImageIndex === i && "active"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setUpdateImageIntent(image);
                }}
              >
                <img src="https://iridescent-faloodeh-3725ab.netlify.app/assets/edit.png" alt="update" />
              </div>
              <div
                className={`delete ${
                  activeHoverImageIndex === i && "active"
                }`}
                onClick={(e) => handleDelete(e, image.id)}
              >
                <img src="https://iridescent-faloodeh-3725ab.netlify.app/assets/trash-bin.png" alt="delete" />
              </div>
              <img
                src={image.url}
                alt={image.title}
                onError={({ currentTarget }) => {
                  currentTarget.src = "https://www.pngmart.com/files/17/Caution-Warning-PNG-Clipart.png";
                }}
              />
              <span>{image.title.substring(0, 20)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
