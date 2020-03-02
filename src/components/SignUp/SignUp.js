import React from "react";
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import './SignUp.scss'

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("password don't match!");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I don't have a acount</h2>
        <span>Sign up with your email and pass</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            value={displayName}
            name="displayName"
            onChange={this.handleChange}
            label="displayName"
            required
          />
          <FormInput
            type="email"
            value={email}
            name="email"
            onChange={this.handleChange}
            label="email"
            required
          />
          <FormInput
            type="password"
            value={password}
            name="password"
            onChange={this.handleChange}
            label="password"
            required
          />
          <FormInput
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={this.handleChange}
            label="confirmPassword"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;