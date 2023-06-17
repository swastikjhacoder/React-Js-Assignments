import { useState } from "react";
import ChildComponent from "./ChildComponenrt";
import { colorContext } from "../context";

const ParentComponent = (props) => {
  const [color, setColor] = useState("#000000");

  return (
    <>
      <h1>Pick a color</h1>
      <input
        type="color"
        onChange={(e) => {
          setColor(e.target.value);
        }}
        value={color}
      />
      <colorContext.Provider value={{color, setColor}}>
        <ChildComponent/>
      </colorContext.Provider>
    </>
  );
};

export default ParentComponent;
