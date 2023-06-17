import "./App.css";
import Items from "./components/Items";
import Navbar from "./components/Navbar";
import CustomItemContext from "./itemContext";

function App() {
  return (
    // providing multiple contexts
    <CustomItemContext>
      <div className="App">
        <h2>Shopping Cart</h2>
        <Navbar />
        <Items />
      </div>
    </CustomItemContext>
  );
}
export default App;
