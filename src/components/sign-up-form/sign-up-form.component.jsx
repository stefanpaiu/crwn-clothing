import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmedPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmedPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Password Checks
    if (password !== confirmedPassword) {
      alert("Passwords do not match");
      return;
    } else if (password === confirmedPassword && password.length < 6) {
      alert("Passwords must be longer than 5 characters.");
    }

    // Creates the Authentication
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);

      // Creates the UserDoc
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("Cannot create user. Email already in use.");
      else {
        console.log("Could not Create User", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with yout email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmedPassword"
          value={confirmedPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
