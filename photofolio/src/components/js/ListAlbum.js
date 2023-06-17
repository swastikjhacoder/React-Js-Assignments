//importing React component
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "react-spinner-material";

// firebase imports
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from './FirebaseInit';

// components imports
import { AlbumForm } from "./AlbumForm";
import { ImagesList } from "./ImagesList";

//exporting component
export const ListAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const [albumAddLoading, setAlbumAddLoading] = useState(false);
  //Arrow Function Components
  const getAlbums = async () => {
    setLoading(true);
    const albumsRef = collection(db, "album");
    const albumsSnapshot = await getDocs(
      query(albumsRef, orderBy("created", "desc"))
    );
    const albumsData = albumsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAlbums(albumsData);
    setLoading(false);
  };
  //performing side effect
  useEffect(() => {
    getAlbums();
  }, []);
  //Arrow Function Components
  const handleAdd = async (name) => {
    if (albums.find((a) => a.name === name))
      return toast.error("Album name already in use.");
    setAlbumAddLoading(true);
    const albumRef = await addDoc(collection(db, "album"), {
      name,
      created: Timestamp.now(),
    });
    setAlbums((prev) => [{ id: albumRef.id, name }, ...prev]);
    setAlbumAddLoading(false);
    toast.success("Album added successfully.");
  };

  const [createAlbumIntent, setCreateAlbumIntent] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);
  //Arrow Function Components
  const handleClick = (name) => {
    if (activeAlbum === name) return setActiveAlbum(null);
    setActiveAlbum(name);
  };

  const handleBack = () => setActiveAlbum(null);

  if (albums.length === 0 && !loading) {
    return (
      <>
        <div className="top">
          <h3>No albums found.</h3>
          <button
            className={createAlbumIntent ? "active" : null}
            onClick={() => setCreateAlbumIntent(!createAlbumIntent)}>
            {!createAlbumIntent ? "Add album" : "Cancel"}
          </button>
        </div>
        {createAlbumIntent && <AlbumForm onAdd={handleAdd} />}
      </>
    );
  }
  if (loading) {
    return (
      <div className="loader">
        <Spinner color="#0077ff" />
      </div>
    );
  }

  return (
    <>
      {createAlbumIntent && !activeAlbum && (
        <AlbumForm loading={albumAddLoading} onAdd={handleAdd} />
      )}
      {!activeAlbum && (
        <div className="Album-container">
          <div className="top">
            <h3>Your albums</h3>
            <button
              className={createAlbumIntent ? "active" : null}
              onClick={() => setCreateAlbumIntent(!createAlbumIntent)}
            >
              {!createAlbumIntent ? "Add album" : "Cancel"}
            </button>
          </div>
          <div className="albumsList">
            {albums.map((album) => (
              <div
                key={album.id}
                className="album"
                onClick={() => handleClick(album.name)}
              >
                <span>{album.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeAlbum && (
        <ImagesList
          albumId={albums.find((a) => a.name === activeAlbum).id}
          albumName={activeAlbum}
          onBack={handleBack}
        />
      )}
    </>
  );
};
