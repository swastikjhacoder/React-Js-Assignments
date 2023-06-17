import GrandChildComponent from "./GrandChildComponent";

const ChildComponent = () => (
  <div
    style={{
      border: "2px solid #fff",
      margin: "15px",
      padding: "10px",
      fontSize: "30px",
      width: "300px"
    }}
  >
    <GrandChildComponent />
  </div>
);

export default ChildComponent;
