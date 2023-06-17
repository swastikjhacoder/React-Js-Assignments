import Default from "./component/Default";
import ToggleVisibility from "./component/ToggleVisibility";
import "./style.css";

export default function App() {
  return (
    <div className="App">
      <ToggleVisibility>
        <Default />
      </ToggleVisibility>
    </div>
  );
}