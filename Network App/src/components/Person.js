import { Component } from "react";

class Person extends Component {
  // Define appropriate lifecycle method to show alert here
  componentWillUnmount(){
    const {email} = this.props.person;
    alert(`A person ${email} was removed from your app`);
  }

  render() {
    const { img, email } = this.props.person;
    const {onRemove, index} = this.props;
    return (
      <div className="person">
        <b onClick={() => onRemove(index)}>X</b>
        <img alt={email} src={img} />
        <p>{email}</p>
      </div>
    );
  }
}

export default Person;
