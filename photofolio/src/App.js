//Components Import
import { Navbar } from "./components/js/Navbar";
import { ListAlbum } from "./components/js/ListAlbum";
// react toasts
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div>
        <ListAlbum />
      </div>
    </div>
  );
}

export default App;
