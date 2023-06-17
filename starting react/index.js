/* JAVASCRIPT */
// const heading = document.createElement("h2");
// heading.textContent = "Hello World!";
// heading.className = "header";

// document.getElementById("root").append(heading);

/* REACT WITH JS */

// const reactHeading = React.createEelement("h1", {className: "head"}, "Hello React!");
// const reactHeading = React.createElement("h1",{className: "head", id: "reactHead", children: "Hello React!"});
// ReactDOM.createRoot(document.getElementById("root")).render(reactHeading);

// const reactButton = React.createElement("button",{className: "btn1", id: "reactBtn", children: "Click"});
// ReactDOM.createRoot(document.getElementById("root")).render(reactButton);

// const reactHeading = React.createElement("img", {src: "https://files.codingninjas.in/coding-ninjas-24647.png"});
        
// ReactDOM.createRoot(document.getElementById("root")).render(reactHeading);

/* REACT WITH JSX */

// const jsxHeading = (<>
//                     <h1>Hello JSX!</h1>
//                     <p>This is created using JSX</p>
//                     </>)

function Name(){
    return(<>
    <p>JSX is JavaScript XML</p>
    </>);
}

const App = () => (
    <>
        <h1>Hello JSX!</h1>
        <p>This is created using JSX</p>
        <ol type="number">
            <li>HTML</li>
            <li>JavaScript</li>
            <li>CSS</li>
        </ol>
    <Name />
    </>
)

ReactDOM.createRoot(document.getElementById("root")).render(<App />);