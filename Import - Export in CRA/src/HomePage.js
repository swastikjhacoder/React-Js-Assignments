import Form from "./Form"
let name = "YourName";
let email = "xyz@pqr.com"
function HomePage() {
  return (
    <div className="Homepage">
      <h1>Home Page</h1>
      <Form />
    </div>
  );
}

export default HomePage;
export {name, email};