import {name, email} from "./HomePage";

const Form = () => (
  <>
    <div>
      <form>
      <h3>Login Page</h3>
      <input type="text" placeholder="Name" value={name}/>
      <input type="email" placeholder="email" value={email}/>
      <button>Login</button>
      </form>
    </div>
  </>
);

export default Form;